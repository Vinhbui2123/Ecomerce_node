const jwt = require("jsonwebtoken")
const asyncHandler = require("express-async-handler")

const verifyAccessToken = asyncHandler(async (req, res, next) => {
  if (req?.headers?.authorization?.startsWith("Bearer")) {
    // Get token from header Bearer token string => split => token
    const token = req.headers.authorization.split(" ")[1]
    jwt.verify(token, process.env.JWT_SECRET, (err, decode) => {
      if (err) {
        res.status(401).json({ success: false, message: "Token is not valid" })
      } else {
        req.user = decode
        next()
      }
    })
  } else {
    res.status(401).json({ success: false, message: "Token is not supplied" })
  }
})

module.exports = { verifyAccessToken }
