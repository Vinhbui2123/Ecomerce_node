const jwt = require("jsonwebtoken")

// Generate access token and refresh token
const generateAccessToken = (uid, role) =>
  jwt.sign({ _id: uid, role }, process.env.JWT_SECRET, { expiresIn: "1d" })
const generateRefreshToken = (uid) =>
  jwt.sign({ _id: uid }, process.env.JWT_SECRET, { expiresIn: "5d" })

module.exports = { generateAccessToken, generateRefreshToken }
