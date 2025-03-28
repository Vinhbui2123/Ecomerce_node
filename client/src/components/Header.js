import React from "react"
import logo from "../assets/logo.png"
import icons from "../ultils/icons"
import { Link } from "react-router-dom"
import path from "../ultils/path"

const Header = () => {
  const { MdPhone, MdEmail, BsHandbagFill, FaUserCircle } = icons
  return (
    <div className="w-main flex justify-between h-[110px] py-[35px]">
      <Link to={`${path.HOME}`}>
        <img src={logo} alt="logo" className="w-[234px] object-contain" />
      </Link>
      <div className="flex text-[13px] ">
        <div className="flex flex-col px-6 bx items-center">
          <span className="flex gap-4 items-center">
            <span>
              <MdPhone color="red" />
            </span>
            <span className="font-semibold">(+1800) 000 8808</span>
          </span>
          <span>Mon-Sat 9:00AM - 8:00PM</span>
        </div>
        <div className="flex flex-col items-center px-6 border-x">
          <span className="flex gap-4 items-center">
            <span>
              <MdEmail color="red" />
            </span>
            <span className="font-semibold">SUPPORT@OKEOKE.VN</span>
          </span>
          <span>Online Support 24/7</span>
        </div>
        <div className="flex items-center justify-center gap-2 px-6 border-x">
          <BsHandbagFill color="red" />
          <span>0 item(s)</span>
        </div>
        <div className="flex items-center justify-center px-6 border-x ">
          <FaUserCircle size={24} />
        </div>
      </div>
    </div>
  )
}

export default Header
