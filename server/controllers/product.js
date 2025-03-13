const Product = require("../models/product")
const asyncHandler = require("express-async-handler")
const slugify = require("slugify")

const createProduct = asyncHandler(async (req, res) => {
  if (Object.keys(req.body).length === 0)
    throw new Error("Please provide product details")
  if (req.body && req.body.title) req.body.slug = slugify(req.body.title)
  const newProduct = await Product.create(req.body)
  return res.status(200).json({
    success: newProduct ? true : false,
    createProduct: newProduct ? newProduct : "Can not create product",
  })
})

const getProduct = asyncHandler(async (req, res) => {
  const { pid } = req.params
  const product = await Product.findById(pid)
  return res.status(200).json({
    success: product ? true : false,
    productsData: product ? product : "Can not get product",
  })
})
const getAllProduct = asyncHandler(async (req, res) => {
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
  // Filltering
  if (queries?.title)
    fomatedQueries.title = { $regex: queries.title, $options: "i" }
  let queryComand = Product.find(fomatedQueries)
  // Sorting
  if (req.query.sort) {
    const sortBy = req.query.sort.split(",").join(" ")
    queryComand = queryComand.sort(sortBy)
  }
  // Field limiting
  if (req.query.fields) {
    const fields = req.query.fields.split(",").join(" ")
    queryComand = queryComand.select(fields)
  }
  // Pagination
  const page = +req.query.page || 1
  const limit = +req.query.limit || process.env.LIMIT_PRODUCTS
  const skip = (page - 1) * limit
  queryComand = queryComand.skip(skip).limit(limit)
  // Execute query
  try {
    const response = await queryComand.exec()
    const counts = await Product.find(fomatedQueries).countDocuments()

    return res.status(200).json({
      success: response ? true : false,
      counts,
      products: response ? response : "Can not get products",
    })
  } catch (err) {
    throw new Error(err.message)
  }
})
const getUpdateProduct = asyncHandler(async (req, res) => {
  const { pid } = req.params
  if (req.body && req.body.title) req.body.slug = slugify(req.body.title)
  const updateProduct = await Product.findByIdAndUpdate(pid, req.body, {
    new: true,
  })
  return res.status(200).json({
    success: updateProduct ? true : false,
    updateProduct: updateProduct ? updateProduct : "Can not update product",
  })
})
const deleteProduct = asyncHandler(async (req, res) => {
  const { pid } = req.params
  const deleteProduct = await Product.findByIdAndDelete(pid)
  return res.status(200).json({
    success: deleteProduct ? true : false,
    deleteProduct: deleteProduct ? deleteProduct : "Can not delete product",
  })
})
const rating = asyncHandler(async (req, res) => {
  const { _id } = req.user
  const { star, comment, pid } = req.body
  // check if user already rating
  if (!star || !pid) throw new Error("Please provide star and product id")
  // check if user already rating
  const ratingProduct = await Product.findById(pid)
  // check if user already rating this product or not postBy user id in rating array of product model
  const alreadyRating = ratingProduct?.ratings?.find(
    (el) => el.postedBy.toString() === _id
  )
  if (alreadyRating) {
    // update rating
    await Product.updateOne(
      { ratings: { $elemMatch: alreadyRating } },
      { $set: { "ratings.$.star": star, "ratings.$.comment": comment } },
      { new: true }
    )
  } else {
    // add rating
    const response = await Product.findByIdAndUpdate(
      pid,
      { $push: { ratings: { star, comment, postedBy: _id } } },
      { new: true }
    )
  }
  // sumRatings
  const updatedRating = await Product.findById(pid)
  const ratingCount = updatedRating.ratings.length
  const sumRatings = updatedRating.ratings.reduce(
    (acc, el) => acc + +el.star,
    0
  )
  updatedRating.totalRatings = Math.round((sumRatings * 10) / ratingCount) / 10
  await updatedRating.save()
  return res.status(200).json({
    success: true,
    updatedRating,
  })
})
const uploadImagesProduct = asyncHandler(async (req, res) => {
  const { pid } = req.params
  if (!req.files) throw new Error("Please upload images")
  const response = await Product.findByIdAndUpdate(
    pid,
    { $push: { images: { $each: req.files.map((el) => el.path) } } },
    { new: true }
  )
  return res.status(200).json({
    success: response ? true : false,
    uploadImagesProduct: response ? response : "Can not upload images",
  })
})

module.exports = {
  createProduct,
  getProduct,
  getAllProduct,
  getUpdateProduct,
  deleteProduct,
  rating,
  uploadImagesProduct,
}
