import React from "react"
import { renderStarFromNumber, formatCurrency } from "../ultils/helper"

const ProductCard = ({ price, totalRatings, title, image }) => {
  return (
    <div className="w-1/3 flex-auto flex px-[10px] mb-[20px]">
      <div className="flex w-full border">
        <img src={image} alt="products" className="w-[110px] object-contain" />
        <div className="flex flex-col gap-1 mt-[15px] items-start w-full text-xs">
          <span className="line-clamp-1 capitalize text-sm">
            {title.toLowerCase()}
          </span>
          <span className="flex h-4">
            {renderStarFromNumber(totalRatings, 14)}
          </span>
          <span>{`${formatCurrency(price)} VND`}</span>
        </div>
      </div>
    </div>
  )
}

export default ProductCard
