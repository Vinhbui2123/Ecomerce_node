const User = require("../models/user")
const asyncHandler = require("express-async-handler")
const {
  generateAccessToken,
  generateRefreshToken,
} = require("../middlewares/jwt")
const jwt = require("jsonwebtoken")
const sendMail = require("../ultils/sendmail")
const crypto = require("crypto")

const register = asyncHandler(async (req, res) => {
  const { email, password, lastname, firstname } = req.body
  if (!email || !password || !lastname || !firstname) {
    return res.status(400).json({
      success: false,
      message: "All fields are required",
    })
  }
  const user = await User.findOne({ email })
  if (user) {
    throw new Error("User already exists")
  } else {
    const newUser = await User.create(req.body)
    return res.status(200).json({
      success: newUser ? true : false,
      mes: newUser ? "User created successfully" : "something went wrong",
    })
  }
})
const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body
  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: "Missing output",
    })
  }
  const response = await User.findOne({ email })
  if (response && (await response.isCorrectPassword(password))) {
    // tach password va role ra khoi response
    const { password, role, ...userData } = response.toObject()
    //tao token
    const accessToken = generateAccessToken(response._id, role)
    // tao refresh token
    const refreshToken = generateRefreshToken(response._id)
    // Luu refesh token vao db
    await User.findByIdAndUpdate(response._id, { refreshToken }, { new: true })
    // Luu refresh token vao cookie
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    })
    return res.status(200).json({
      success: true,
      accessToken,
      userData,
    })
  } else {
    return res.status(401).json({
      success: false,
      message: "Invalid credentials",
    })
  }
})
// Lay thong tin user hien tai
const getCurrent = asyncHandler(async (req, res) => {
  const { _id } = req.user
  const user = await User.findById(_id).select("-password -refreshToken -role")
  return res.status(200).json({
    success: true,
    rs: user ? user : "User not found",
  })
})
const refreshAccessToken = asyncHandler(async (req, res) => {
  // lay cookie tu req
  const cookie = req.cookies
  // check xem co refreshToken trong cookie khong
  if (!cookie && !cookie.refreshToken) throw new Error("refreshToken not found")
  // check refreshToken co hop le khong
  const rs = jwt.verify(cookie.refreshToken, process.env.JWT_SECRET)
  const response = await User.findOne({
    _id: rs._id,
    refreshToken: cookie.refreshToken,
  })
  return res.status(200).json({
    success: response ? true : false,
    newAccessToken: response
      ? generateAccessToken(response._id, response.role)
      : "token expired",
  })
})

const logout = asyncHandler(async (req, res) => {
  const cookie = req.cookies
  if (!cookie || !cookie.refreshToken) throw new Error("refreshToken not found")
  // xoa refreshToken trong db
  await User.findOneAndUpdate(
    { refreshToken: cookie.refreshToken },
    { refreshToken: "" },
    { new: true }
  )
  //xoa refreshToken trong cookie
  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: true,
  })
  return res.status(200).json({
    success: true,
    message: "Logout success",
  })
})

const fogotPassword = asyncHandler(async (req, res) => {
  const { email } = req.query
  if (!email) throw new Error("Email is required")
  const user = await User.findOne({ email })
  if (!user) throw new Error("User not found")
  // Tao reset token
  const resetToken = user.createPasswordResetToken()
  await user.save()

  // Gui email chua reset token
  const html = `<h1>Reset your password. This link will expire in 15 minutes</h1>
  <a href=${process.env.URL_SERVER}/api/user/reset-password/${resetToken}>Reset Password</a>`

  const data = {
    email,
    html,
  }
  const rs = await sendMail(data)
  return res.status(200).json({
    success: true,
    message: rs,
  })
})

const resetPassword = asyncHandler(async (req, res) => {
  const { password, token } = req.body
  if (!password || !token) throw new Error("Password and token are required")
  // hash token
  const passwordResetToken = crypto
    .createHash("sha256")
    .update(token)
    .digest("hex")
  // tim user co token trong db
  const user = await User.findOne({
    passwordResetToken,
    passwordResetExpires: { $gt: Date.now() },
  })
  if (!user) throw new Error("Invalid or expired token")
  user.password = password
  user.passwordResetToken = undefined
  user.passwordResetExpires = undefined
  user.passwordChangedAt = Date.now()
  await user.save()
  return res.status(200).json({
    success: user ? true : false,
    mes: user ? "Password reset successfully" : "Something went wrong",
  })
})

module.exports = {
  register,
  login,
  getCurrent,
  refreshAccessToken,
  logout,
  fogotPassword,
  resetPassword,
}
