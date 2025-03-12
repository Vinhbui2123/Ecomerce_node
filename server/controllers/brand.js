const Brand = require("../models/brand")
const asyncHandler = require("express-async-handler")

const createBrand = asyncHandler(async (req, res) => {
  const response = await Brand.create(req.body)

  res.status(201).json({
    success: true,
    createBrand: response ? response : "cannot create brand",
  })
})
const getBrand = asyncHandler(async (req, res) => {
  const response = await Brand.find()

  res.status(200).json({
    success: true,
    brands: response ? response : "cannot retrieve brands",
  })
})
const updateBrand = asyncHandler(async (req, res) => {
  const { bid } = req.params
  const response = await Brand.findByIdAndUpdate(bid, req.body, {
    // changed bcid to bid
    new: true,
  })

  res.status(200).json({
    success: true,
    updatedBrand: response ? response : "cannot update brand",
  })
})
const deleteBrand = asyncHandler(async (req, res) => {
  const { bid } = req.params
  const response = await Brand.findByIdAndDelete(bid) // changed bcid to bid

  res.status(200).json({
    success: true,
    deletedBrand: response ? response : "cannot delete brand",
  })
})

module.exports = {
  createBrand,
  getBrand,
  updateBrand,
  deleteBrand,
}
