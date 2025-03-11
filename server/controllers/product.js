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
  const products = await Product.find()
  return res.status(200).json({
    success: products ? true : false,
    productsData: products ? products : "Can not get products",
  })
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

module.exports = {
  createProduct,
  getProduct,
  getAllProduct,
  getUpdateProduct,
  deleteProduct,
}
