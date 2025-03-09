const User = require("../models/user")
const asyncHandler = require("express-async-handler")

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
    const { password, role, ...userData } = response.toObject()
    return res.status(200).json({
      success: true,
      message: "User logged in successfully",
      userData,
    })
  } else {
    return res.status(401).json({
      success: false,
      message: "Invalid credentials",
    })
  }
})

module.exports = { register, login }
