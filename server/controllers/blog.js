const Blog = require("../models/blog")
const asyncHandler = require("express-async-handler")

const createBlog = asyncHandler(async (req, res) => {
  const { title, description, category } = req.body
  if (!title || !description || !category)
    throw new Error("Please provide all fields")
  const response = await Blog.create(req.body)
  res.status(201).json({
    success: response ? true : false,
    createBlog: response ? response : "cannot create blog ",
  })
})
const updateBlog = asyncHandler(async (req, res) => {
  const { bid } = req.params
  if (Object.keys(req.body).length === 0)
    throw new Error("Missing input fields")
  const response = await Blog.findByIdAndUpdate(bid, req.body, { new: true })
  res.status(200).json({
    success: response ? true : false,
    updateBlog: response ? response : "cannot update blog ",
  })
})
const getBlogs = asyncHandler(async (req, res) => {
  // destructuring query from req object
  const queries = { ...req.query }
  // tach cac truong dac biet ra khoi query
  const excludedFields = ["page", "sort", "limit", "fields"]
  excludedFields.forEach((el) => delete queries[el])

  // format lai cac operator trong mongoose
  let queryString = JSON.stringify(queries)
  // thay the cac operator bang $ operator cua mongoose
  queryString = queryString.replace(
    /\b(gte|gt|lte|lt)\b/g,
    (matchedEl) => `$${matchedEl}`
  )
  // parse lai thanh object de truyen vao find
  const fomatedQueries = JSON.parse(queryString)
  // // Filltering
  // if (queries?.title)
  //   fomatedQueries.title = { $regex: queries.title, $options: "i" }
  // // Sorting
  // if (req.query.sort) {
  //   const sortBy = req.query.sort.split(",").join(" ")
  //   queryComand = queryComand.sort(sortBy)
  // }
  // // Field limiting
  // if (req.query.fields) {
  //   const fields = req.query.fields.split(",").join(" ")
  //   queryComand = queryComand.select(fields)
  // }
  let queryComand = Blog.find(fomatedQueries)
  // Pagination
  const page = +req.query.page || 1
  const limit = +req.query.limit || process.env.LIMIT_PRODUCTS
  const skip = (page - 1) * limit
  queryComand = queryComand.skip(skip).limit(limit)
  // Execute query
  try {
    const response = await queryComand.exec()
    const counts = await Blog.find(fomatedQueries).countDocuments()

    return res.status(200).json({
      success: response ? true : false,
      counts,
      products: response ? response : "Can not get products",
    })
  } catch (err) {
    throw new Error(err.message)
  }
})
/*
Khi nguoi dung bam vao nut like
1. Kiem tra xem nguoi dung da dislike chua
2. Neu chua dislike thi cho like
3. Neu da dislike roi thi bo dislike va cho like
4. Neu da like roi thi bo like chua like thi cho like
*/
const likeBlog = asyncHandler(async (req, res) => {
  const { _id } = req.user
  const { bid } = req.params
  if (!bid) throw new Error("Missing input fields")
  const blog = await Blog.findById(bid)
  const alreadyDisLiked = blog?.dislikes?.find((el) => el.toString() === _id)
  if (alreadyDisLiked) {
    const response = await Blog.findByIdAndUpdate(
      bid,
      { $pull: { dislikes: _id } },
      { new: true }
    )
    return res.status(200).json({
      success: response ? true : false,
      rs: response,
    })
  }
  const isLiked = blog?.likes?.find((el) => el.toString() === _id)
  if (isLiked) {
    const response = await Blog.findByIdAndUpdate(
      bid,
      { $pull: { likes: _id } },
      { new: true }
    )
    return res.status(200).json({
      success: response ? true : false,
      rs: response,
    })
  } else {
    const response = await Blog.findByIdAndUpdate(
      bid,
      { $push: { likes: _id } },
      { new: true }
    )
    return res.status(200).json({
      success: response ? true : false,
      rs: response,
    })
  }
})

const disLikeBlog = asyncHandler(async (req, res) => {
  const { _id } = req.user
  const { bid } = req.params
  if (!bid) throw new Error("Missing input fields")
  const blog = await Blog.findById(bid)
  const alreadyDisLiked = blog?.dislikes?.find((el) => el.toString() === _id)
  if (alreadyDisLiked) {
    const response = await Blog.findByIdAndUpdate(
      bid,
      { $pull: { likes: _id } },
      { new: true }
    )
    return res.status(200).json({
      success: response ? true : false,
      rs: response,
    })
  }
  const isLiked = blog?.dislikes?.find((el) => el.toString() === _id)
  if (isLiked) {
    const response = await Blog.findByIdAndUpdate(
      bid,
      { $pull: { dislikes: _id } },
      { new: true }
    )
    return res.status(200).json({
      success: response ? true : false,
      rs: response,
    })
  } else {
    const response = await Blog.findByIdAndUpdate(
      bid,
      { $push: { dislikes: _id } },
      { new: true }
    )
    return res.status(200).json({
      success: response ? true : false,
      rs: response,
    })
  }
})
const getBlog = asyncHandler(async (req, res) => {
  const { bid } = req.params
  const blog = await Blog.findByIdAndUpdate(
    bid,
    { $inc: { numberViews: 1 } },
    { new: true }
  )
    .populate("likes", "firstname lastname")
    .populate("dislikes", "firstname lastname")
  return res.json({
    success: blog ? true : false,
    rs: blog,
  })
})

const deleteBlog = asyncHandler(async (req, res) => {
  const { bid } = req.params
  const response = await Blog.findByIdAndDelete(bid)
  res.status(200).json({
    success: response ? true : false,
    deletedBlog: response ? response : "cannot delete blog ",
  })
})
const uploadImagesBlog = asyncHandler(async (req, res) => {
  const { bid } = req.params
  if (!req.file) throw new Error("Please upload images")
  const response = await Blog.findByIdAndUpdate(
    bid,
    { image: req.file.path },
    { new: true }
  )
  return res.status(200).json({
    success: response ? true : false,
    uploadImagesBlog: response ? response : "Can not upload images",
  })
})

module.exports = {
  createBlog,
  updateBlog,
  getBlog,
  getBlogs,
  likeBlog,
  disLikeBlog,
  deleteBlog,
  uploadImagesBlog,
}
