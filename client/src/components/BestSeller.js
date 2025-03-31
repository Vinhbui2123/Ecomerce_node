import React from "react"
import { useEffect, useState } from "react"
import { apiGetProducts } from "../apis/product"
import { Product } from "./"
import Slider from "react-slick"

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
const settings = {
  dots: false,
  infinite: false,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 1,
}
const BestSeller = () => {
  const [bestSeller, setbestSeller] = useState(null)
  const [newProducts, setNewProducts] = useState(null)
  const [activedTab, setactiveTab] = useState(1)
  const [products, setproducts] = useState(null)
  const fetchProducts = async () => {
    const response = await Promise.all([
      apiGetProducts({ sort: "-sold" }),
      apiGetProducts({ sort: "-createdAt" }),
    ])
    if (response[0]?.success) {
      setbestSeller(response[0].products)
      setproducts(response[0].products)
    }
    if (response[1]?.success) setNewProducts(response[1].products)
  }

  useEffect(() => {
    fetchProducts()
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
        <Slider {...settings}>
          {products?.map((el) => (
            <Product
              key={el.id}
              pid={el.id}
              productData={el}
              isNew={activedTab === 1 ? false : true}
            />
          ))}
        </Slider>
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
