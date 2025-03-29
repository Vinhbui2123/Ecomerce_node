const Product = require("../models/product")
const data = require("../../data/data2.json")
const slugify = require("slugify")
const asyncHandler = require("express-async-handler")
const categoryData = require("../../data/cate_brand")
const ProductCategory = require("../models/productCategory")
const fn = async (product) => {
  await Product.create({
    title: product?.name,
    slug:
      slugify(product?.name || "product") +
      "-" +
      Math.round(Math.random() * 10000) +
      "-" +
      Date.now(),
    description: product?.description,
    brand: product?.brand,
    price: Math.round(Number(product?.price?.match(/\d/g).join("")) / 100),
    category: product?.category[1],
    quantity: Math.round(Math.random() * 1000),
    sold: Math.round(Math.random() * 100),
    images: product?.images,
    color: product?.variants?.find((el) => el.label === "Color")?.variants[0],
    thumb: product?.thumb,
  })
}
const insertData = asyncHandler(async (req, res) => {
  const promises = []
  for (let product of data) promises.push(fn(product))
  await Promise.all(promises)
  return res.json("dung")
})
const fn2 = async (cate) => {
  await ProductCategory.create({
    title: cate?.cate,
    brand: cate?.brand,
  })
}
const insertCategory = asyncHandler(async (req, res) => {
  try {
    // First drop the existing indexes that are causing problems
    await ProductCategory.collection.dropIndexes()

    // Then clear existing data
    await ProductCategory.deleteMany({})

    // Now insert the new data
    const promises = []
    for (let cate of categoryData) {
      promises.push(
        ProductCategory.create({
          title: cate?.cate,
          brand: cate?.brand,
        })
      )
    }
    await Promise.all(promises)
    return res.json("Categories inserted successfully")
  } catch (error) {
    console.error("Error inserting categories:", error)
    return res.status(500).json({ error: error.message })
  }
})
module.exports = {
  insertData,
  insertCategory,
}
