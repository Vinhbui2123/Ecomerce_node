const router = require("express").Router()
const ctrls = require("../controllers/blog")
const { verifyAccessToken, isAdmin } = require("../middlewares/verifytoken")

router.post("/", [verifyAccessToken, isAdmin], ctrls.createBlog)
router.get("/", ctrls.getBlogs)
router.get("/one/:bid", ctrls.getBlog)
router.put("/like/:bid", verifyAccessToken, ctrls.likeBlog)
router.put("/dislike/:bid", verifyAccessToken, ctrls.disLikeBlog)
router.put("/:bid", [verifyAccessToken, isAdmin], ctrls.updateBlog)
router.delete("/:bid", [verifyAccessToken, isAdmin], ctrls.deleteBlog)

module.exports = router
  