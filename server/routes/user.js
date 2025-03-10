const router = require("express").Router()
const ctrls = require("../controllers/user")
const { verifyAccessToken } = require("../middlewares/verifytoken")

router.post("/register", ctrls.register)
router.post("/login", ctrls.login)
router.get("/current", verifyAccessToken, ctrls.getCurrent)
router.post("/refreshtoken", ctrls.refreshAccessToken)
router.get("/logout", ctrls.logout)
router.get("/fogotpassword", ctrls.fogotPassword)
router.put("/resetpassword", ctrls.resetPassword)
module.exports = router
