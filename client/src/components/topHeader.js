import React, { memo } from "react"
import { Link } from "react-router-dom"
import path from "../ultils/path"

const TopHeader = () => {
  return (
    <div className="h-[38px] w-full bg-main flex items-center justify-center ">
      <div className="w-main flex justify-between text-xs text-white ">
        <span>ORDER ONLINE OR CALL US AT 0999999</span>
        <Link className="hover:text-gray-800" to={`/${path.LOGIN}`}>
          Sign in or create account
        </Link>
      </div>
    </div>
  )
}

export default memo(TopHeader)
