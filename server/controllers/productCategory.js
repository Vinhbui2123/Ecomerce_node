const ProductCategory = require("../models/productCategory")
const asyncHandler = require("express-async-handler")

const createProductCategory = asyncHandler(async (req, res) => {
  const response = await ProductCategory.create(req.body)
  res.status(201).json({
    success: true,
    createProductCategory: response
      ? response
      : "cannot create product category",
  })
})
const getProductCategory = asyncHandler(async (req, res) => {
  const response = await ProductCategory.find().select("title _id")
  res.status(200).json({
    success: true,
    getProductCategory: response ? response : "cannot get product category",
  })
})
const updateProductCategory = asyncHandler(async (req, res) => {
  const { pcid } = req.params
  const response = await ProductCategory.findByIdAndUpdate(pcid, req.body, {
    new: true,
  })
  res.status(200).json({
    success: true,
    updateProductCategory: response
      ? response
      : "cannot update product category",
  })
})
const deleteProductCategory = asyncHandler(async (req, res) => {
  const { pcid } = req.params
  const response = await ProductCategory.findByIdAndDelete(pcid)
  res.status(200).json({
    success: true,
    deleteProductCategory: response
      ? response
      : "cannot delete product category",
  })
})
module.exports = {
  createProductCategory,
  updateProductCategory,
  getProductCategory,
  deleteProductCategory,
}
