import React, { useState } from "react"
import { formatCurrency } from "../ultils/helper"
import new1 from "../assets/new.png"
import trending from "../assets/trending.png"
import { renderStarFromNumber } from "../ultils/helper"
import { SelectOption } from "./"
import icons from "../ultils/icons"

const { AiFillEye, BsFillSuitHeartFill, AiOutlineMenu } = icons
const Product = ({ productData, isNew }) => {
  const [isShowOption, setisShowOption] = useState(false)
  return (
    <div className="w-full text-base px-[10px]">
      <div
        className="w-full border p-[15px] flex flex-col gap-2 items-center justify-center rounded-lg hover:shadow-md transition-all duration-200 ease-in-out"
        onMouseEnter={(e) => {
          e.stopPropagation()
          setisShowOption(true)
        }}
        onMouseLeave={(e) => {
          e.stopPropagation()
          setisShowOption(false)
        }}
      >
        <div className="w-full relative">
          {isShowOption && (
            <div className="absolute bottom-[-10px] gap-2 left-0 right-0 flex justify-center animate-slide-top">
              <SelectOption icon={<AiFillEye />} />
              <SelectOption icon={<AiOutlineMenu />} />
              <SelectOption icon={<BsFillSuitHeartFill />} />
            </div>
          )}
          <img
            src={
              productData?.thumb ||
              "https://www.shutterstock.com/image-vector/missing-picture-page-website-design-600nw-1552421075.jpg"
            }
            alt=""
            className="w-[274px] h-[274px] object-cover"
          />
          <img
            src={isNew ? new1 : trending}
            alt=""
            className="absolute top-[0] right-[0] object-contain w-[70px] h-[25px]"
          />
        </div>
        <div className="flex flex-col gap-1 mt-[15px] items-start w-full">
          <span className="flex h-4">
            {renderStarFromNumber(productData?.totalRatings)?.map(
              (el, index) => (
                <span key={index} className="flex-1">
                  {el}
                </span>
              )
            )}
          </span>
          <span className="line-clamp-1">{productData?.title}</span>
          <span>{`${formatCurrency(productData?.price)} VND`}</span>
        </div>
      </div>
    </div>
  )
}

export default Product
