import React, { memo } from "react"
import icons from "../ultils/icons"

const { MdEmail, FaFacebook, FaTwitter, FaInstagram, FaLinkedin } = icons

const Footer = () => {
  return (
    <div className="w-full">
      {/* Newsletter section */}
      <div className="h-[120px] w-full bg-main items-center flex justify-center shadow-lg">
        <div className="w-main flex items-center justify-between">
          <div className="flex flex-col flex-1">
            <span className="text-[22px] text-white font-semibold">
              SIGN UP TO NEWSLETTER
            </span>
            <small className="text-[14px] text-gray-100 mt-1">
              Subscribe now and receive weekly newsletter
            </small>
          </div>
          <div className="flex-1 flex items-center">
            <input
              className="p-4 pr-0 rounded-l-full w-full bg-[#F04646] outline-none text-white placeholder:text-sm placeholder:text-gray-200 placeholder:italic placeholder:opacity-50 transition-all hover:bg-[#ff5959] focus:bg-[#ff5959]"
              type="text"
              placeholder="Email address"
            ></input>
            <div className="h-[56px] w-[56px] bg-[#F04646] rounded-r-full flex items-center justify-center text-white cursor-pointer hover:bg-[#ff5959] transition-all">
              <MdEmail size={20} />
            </div>
          </div>
        </div>
      </div>

      {/* Main footer section */}
      <div className="py-12 w-full bg-gray-800 flex justify-center text-white">
        <div className="w-main flex flex-wrap gap-8">
          {/* About us section */}
          <div className="flex-2 flex flex-col gap-3">
            <h3 className="mb-5 text-[16px] font-semibold border-l-2 border-main pl-[15px] text-white">
              About us
            </h3>
            <div className="flex flex-col gap-3 text-[14px]">
              <div className="flex items-start gap-2">
                <span className="font-medium min-w-[70px]">Address:</span>
                <span className="text-gray-300">
                  474 Ontario St Toronto, ON M4X 1M7 Canada
                </span>
              </div>
              <div className="flex items-start gap-2">
                <span className="font-medium min-w-[70px]">Phone:</span>
                <span className="text-gray-300">+1 416 123 4567</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="font-medium min-w-[70px]">Mail:</span>
                <span className="text-gray-300">info@example.com</span>
              </div>

              {/* Social media icons */}
              <div className="flex gap-4 mt-4">
                <span className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center hover:bg-main transition-colors cursor-pointer">
                  <FaFacebook size={16} />
                </span>
                <span className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center hover:bg-main transition-colors cursor-pointer">
                  <FaTwitter size={16} />
                </span>
                <span className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center hover:bg-main transition-colors cursor-pointer">
                  <FaInstagram size={16} />
                </span>
                <span className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center hover:bg-main transition-colors cursor-pointer">
                  <FaLinkedin size={16} />
                </span>
              </div>
            </div>
          </div>

          {/* Information section */}
          <div className="flex-1 flex flex-col gap-3">
            <h3 className="mb-5 text-[16px] font-semibold border-l-2 border-main pl-[15px] text-white">
              Information
            </h3>
            <div className="flex flex-col gap-3 text-[14px]">
              <span className="text-gray-300 hover:text-white hover:translate-x-1 transition-all cursor-pointer">
                Typography
              </span>
              <span className="text-gray-300 hover:text-white hover:translate-x-1 transition-all cursor-pointer">
                Gallery
              </span>
              <span className="text-gray-300 hover:text-white hover:translate-x-1 transition-all cursor-pointer">
                Store Location
              </span>
              <span className="text-gray-300 hover:text-white hover:translate-x-1 transition-all cursor-pointer">
                Today's Deals
              </span>
              <span className="text-gray-300 hover:text-white hover:translate-x-1 transition-all cursor-pointer">
                Contact
              </span>
            </div>
          </div>

          {/* Who we are section */}
          <div className="flex-1 flex flex-col gap-3">
            <h3 className="mb-5 text-[16px] font-semibold border-l-2 border-main pl-[15px] text-white">
              Who we are
            </h3>
            <div className="flex flex-col gap-3 text-[14px]">
              <span className="text-gray-300 hover:text-white hover:translate-x-1 transition-all cursor-pointer">
                Help
              </span>
              <span className="text-gray-300 hover:text-white hover:translate-x-1 transition-all cursor-pointer">
                Free Shipping
              </span>
              <span className="text-gray-300 hover:text-white hover:translate-x-1 transition-all cursor-pointer">
                FAQs
              </span>
              <span className="text-gray-300 hover:text-white hover:translate-x-1 transition-all cursor-pointer">
                Return & Exchange
              </span>
              <span className="text-gray-300 hover:text-white hover:translate-x-1 transition-all cursor-pointer">
                Testimonials
              </span>
            </div>
          </div>

          {/* Social section */}
          <div className="flex-1 flex flex-col gap-3">
            <h3 className="mb-5 text-[16px] font-semibold border-l-2 border-main pl-[15px] text-white">
              #DigitalWorldStore
            </h3>
            {/* <div className="grid grid-cols-3 gap-2">
              <img
                src="https://via.placeholder.com/80"
                alt="Gallery"
                className="rounded hover:opacity-80 transition-opacity cursor-pointer"
              />
              <img
                src="https://via.placeholder.com/80"
                alt="Gallery"
                className="rounded hover:opacity-80 transition-opacity cursor-pointer"
              />
              <img
                src="https://via.placeholder.com/80"
                alt="Gallery"
                className="rounded hover:opacity-80 transition-opacity cursor-pointer"
              />
              <img
                src="https://via.placeholder.com/80"
                alt="Gallery"
                className="rounded hover:opacity-80 transition-opacity cursor-pointer"
              />
              <img
                src="https://via.placeholder.com/80"
                alt="Gallery"
                className="rounded hover:opacity-80 transition-opacity cursor-pointer"
              />
              <img
                src="https://via.placeholder.com/80"
                alt="Gallery"
                className="rounded hover:opacity-80 transition-opacity cursor-pointer"
              />
            </div> */}
          </div>
        </div>
      </div>

      {/* Copyright section */}
      <div className="py-4 bg-gray-900 text-center text-gray-400 text-sm">
        <p>© {new Date().getFullYear()} Vinhdepzaivcl</p>
      </div>
    </div>
  )
}

export default memo(Footer)
