const Coupon = require("../models/coupon")
const asyncHandler = require("express-async-handler")

const createCoupon = asyncHandler(async (req, res) => {
  const { name, discount, expiry } = req.body
  if (!name || !discount || !expiry)
    throw new Error("Please provide all fields")
  const response = await Coupon.create({
    ...req.body,
    expiry: Date.now() + expiry * 24 * 60 * 60 * 1000,
  })
  res.status(200).json({
    success: response ? true : false,
    createCoupon: response ? response : "cannot create coupon ",
  })
})
const getCoupon = asyncHandler(async (req, res) => {
  const response = await Coupon.find().select("-createdAt -updatedAt ")
  res.status(200).json({
    success: response ? true : false,
    coupons: response ? response : "no coupons found",
  })
})
const updateCoupon = asyncHandler(async (req, res) => {
  const { cid } = req.params
  if (Object.keys(req.body).length === 0)
    throw new Error("Please provide all fields")
  if(req.body.expiry){
    req.body.expiry = Date.now() + req.body.expiry * 24 * 60 * 60 * 1000
  }
  const response = await Coupon.findByIdAndUpdate(cid, req.body, {
    new: true,
  })
  res.status(200).json({
    success: response ? true : false,
    updateCoupon: response ? response : "cannot update coupon ",
  })
})
const deleteCoupon = asyncHandler(async (req, res) => {
  const { cid } = req.params
  if (!cid) throw new Error("Please provide all fields")
  const response = await Coupon.findByIdAndDelete(cid)
  res.status(200).json({
    success: response ? true : false,
    deleteCoupon: response ? response : "cannot delete coupon ",
  })
})

module.exports = {
  createCoupon,
  getCoupon,
  updateCoupon,
  deleteCoupon
}
