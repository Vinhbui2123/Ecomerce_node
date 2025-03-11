const router = require("express").Router()
const ctrls = require("../controllers/user")
const { verifyAccessToken, isAdmin } = require("../middlewares/verifytoken")

router.post("/register", ctrls.register)
router.post("/login", ctrls.login)
router.get("/current", verifyAccessToken, ctrls.getCurrent)
router.post("/refreshtoken", ctrls.refreshAccessToken)
router.get("/logout", ctrls.logout)
router.get("/fogotpassword", ctrls.fogotPassword)
router.put("/resetpassword", ctrls.resetPassword)
router.put("/update", verifyAccessToken, ctrls.updateUser)
// check user role and permissions
router.get("/", [verifyAccessToken, isAdmin], ctrls.getUsers)
router.delete("/", [verifyAccessToken, isAdmin], ctrls.deleteUsers)
router.put("/:uid", [verifyAccessToken, isAdmin], ctrls.updateUserByAdmin)

module.exports = router
