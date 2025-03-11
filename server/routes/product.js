const router = require("express").Router()
const ctrls = require("../controllers/product")
const { verifyAccessToken, isAdmin } = require("../middlewares/verifytoken")

router.post("/", [verifyAccessToken, isAdmin], ctrls.createProduct)
router.get("/", ctrls.getAllProduct)
router.put("/:pid", [verifyAccessToken, isAdmin], ctrls.getUpdateProduct)
router.delete("/:pid", [verifyAccessToken, isAdmin], ctrls.deleteProduct)
router.get("/:pid", ctrls.getProduct)

module.exports = router
