const BlogCategory = require("../models/blogCategory")
const asyncHandler = require("express-async-handler")

const createBlogCategory = asyncHandler(async (req, res) => {
  const response = await BlogCategory.create(req.body)

  res.status(201).json({
    success: true,
    createBlogCategory: response ? response : "cannot create blog category",
  })
})
const getBlogCategory = asyncHandler(async (req, res) => {
  const response = await BlogCategory.find()

  res.status(200).json({
    success: true,
    blogCategories: response ? response : "cannot retrieve blog categories",
  })
})
const updateBlogCategory = asyncHandler(async (req, res) => {
  const { bcid } = req.params
  const response = await BlogCategory.findByIdAndUpdate(bcid, req.body, {
    new: true,
  })

  res.status(200).json({
    success: true,
    updatedBlogCategory: response ? response : "cannot update blog category",
  })
})
const deleteBlogCategory = asyncHandler(async (req, res) => {
  const { bcid } = req.params
  const response = await BlogCategory.findByIdAndDelete(bcid)

  res.status(200).json({
    success: true,
    deletedBlogCategory: response ? response : "cannot delete blog category",
  })
})

module.exports = {
  createBlogCategory,
  getBlogCategory,
  updateBlogCategory,
  deleteBlogCategory,
}
