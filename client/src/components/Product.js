import React from "react"
import { formatCurrency } from "../ultils/helper"
import label from "../assets/label.png"
import label1 from "../assets/label1.png"

const Product = ({ productData, isNew }) => {
  return (
    <div className="w-full text-base px-[10px]">
      <div className="w-full border p-[15px] flex flex-col gap-2 items-center justify-center rounded-lg hover:shadow-md transition-all duration-200 ease-in-out">
        <div className="w-full relative">
          <img
            src={
              productData?.thumb ||
              "https://www.shutterstock.com/image-vector/missing-picture-page-website-design-600nw-1552421075.jpg"
            }
            alt=""
            className="w-[243px] h-[243px] object-cover"
          />
          <img
            src={isNew ? label : label1}
            alt=""
            className="absolute top-[-32px] left-[-42px] w-[120px] object-contain"
          />
          <span
            className={`font-bold top-[-10px] left-[-12px] text-white absolute ${
              isNew ? "" : "text-sm"
            }`}
          >
            {isNew ? "New" : "Trending"}
          </span>
        </div>
        <div className="flex flex-col gap-1 mt-[15px] items-start w-full">
          <span className="line-clamp-1">{productData?.title}</span>
          <span>{`${formatCurrency(productData?.price)} VND`}</span>
        </div>
      </div>
    </div>
  )
}

export default Product
