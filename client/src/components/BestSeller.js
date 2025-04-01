import React from "react"
import { useEffect, useState } from "react"
import { apiGetProducts } from "../apis/product"
import { CustomSlider } from "./"
import { getNewProducts } from "../store/products/asyncAction"
import { useDispatch, useSelector } from "react-redux"

const tabs = [
  {
    id: 1,
    name: "Best Seller",
  },
  {
    id: 2,
    name: "New Arrivals",
  },
]

const BestSeller = () => {
  const [bestSeller, setbestSeller] = useState(null)
  const [activedTab, setactiveTab] = useState(1)
  const [products, setproducts] = useState(null)
  const dispatch = useDispatch()
  const { newProducts } = useSelector((state) => state.products)
  const fetchProducts = async () => {
    const response = await apiGetProducts({ sort: "-sold" })
    if (response.success) {
      setbestSeller(response.products)
      setproducts(response.products)
    }
  }

  useEffect(() => {
    fetchProducts()
    dispatch(getNewProducts())
  }, [])
  useEffect(() => {
    if (activedTab === 1) setproducts(bestSeller)
    if (activedTab === 2) setproducts(newProducts)
  }, [activedTab, bestSeller, newProducts])
  return (
    <div>
      <div className="flex text-[20px] ml-[-32px]">
        {tabs.map((el) => (
          <span
            key={el.id}
            className={`font-semibold uppercase px-8 border-r cursor-pointer text-gray-400 ${
              activedTab === el.id ? "text-gray-900" : ""
            }`}
            onClick={() => setactiveTab(el.id)}
          >
            {el.name}
          </span>
        ))}
      </div>
      <div className="mt-4 mx-[-10px] border-main border-t-2 pt-4">
        <CustomSlider products={products} activedTab={activedTab} />
      </div>
      <div className="w-full gap-4 mt-4 flex">
        <img
          src="https://digital-world-2.myshopify.com/cdn/shop/files/banner2-home2_2000x_crop_center.png?v=1613166657"
          alt="banner"
          className="flex-1 object-contain"
        />
        <img
          src="https://digital-world-2.myshopify.com/cdn/shop/files/banner1-home2_2000x_crop_center.png?v=1613166657"
          alt="banner"
          className="flex-1 object-contain"
        />
      </div>
    </div>
  )
}

export default BestSeller
