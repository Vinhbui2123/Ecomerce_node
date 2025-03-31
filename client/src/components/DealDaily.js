import React, { useState, useEffect, memo } from "react"
import icons from "../ultils/icons"
import { apiGetProducts } from "../apis/product"
import {
  renderStarFromNumber,
  formatCurrency,
  secondToHms,
} from "../ultils/helper"
import { CountDown } from "./"
import moment from "moment"

const { AiFillStar, AiOutlineMenu } = icons
let idInterval

const DealDaily = () => {
  const [dealDaily, setdealDaily] = useState(null)
  const [hour, sethour] = useState(0)
  const [minute, setminute] = useState(0)
  const [second, setsecond] = useState(0)
  const [expireTime, setexpireTime] = useState(false)
  const fetchDealDaily = async () => {
    const response = await apiGetProducts({
      limit: 1,
      page: Math.round(Math.random() * 10),
      totalRatings: 5,
    })
    if (response.success) {
      setdealDaily(response.products[0])
      const today = `${moment().format("MM/DD/YYYY")} 5:00:00 `
      const seconds =
        new Date(today).getTime() - new Date().getTime() + 24 * 60 * 60 * 1000
      const number = secondToHms(seconds)
      sethour(number.h)
      setminute(number.m)
      setsecond(number.s)
    } else {
      sethour(0)
      setminute(59)
      setsecond(59)
    }
  }

  // useEffect(() => {
  //   fetchDealDaily()
  // }, [])
  useEffect(() => {
    idInterval && clearInterval(idInterval)
    fetchDealDaily()
  }, [expireTime])
  useEffect(() => {
    idInterval = setInterval(() => {
      if (second > 0) setsecond((prev) => prev - 1)
      else {
        if (minute > 0) {
          setminute((prev) => prev - 1)
          setsecond(59)
        } else {
          if (hour > 0) {
            sethour((prev) => prev - 1)
            setminute(59)
            setsecond(59)
          } else {
            setexpireTime(!expireTime)
          }
        }
      }
    }, 1000)
    return () => {
      clearInterval(idInterval)
    }
  }, [second, minute, hour, expireTime])
  return (
    <div className="border w-full flex-auto">
      <div className="flex items-center justify-between p-4">
        <span className="flex-1 flex justify-center">
          <AiFillStar size={20} color="#DD1111" />
        </span>
        <span className="flex-8 font-semibold text-[20px] flex justify-center text-gray-700 ">
          DEAL DAILY
        </span>
        <span className="flex-1"></span>
      </div>
      <div className="w-full flex flex-col items-center pt-8 px-4 gap-2">
        <img
          src={
            dealDaily?.thumb ||
            "https://www.shutterstock.com/image-vector/missing-picture-page-website-design-600nw-1552421075.jpg"
          }
          alt=""
          className="w-full object-contain"
        />
        <span className="line-clamp-1 text-center">{dealDaily?.title}</span>
        <span className="flex h-4">
          {renderStarFromNumber(dealDaily?.totalRatings, 20)}
        </span>
        <span>{`${formatCurrency(dealDaily?.price)} VND`}</span>
      </div>
      <div className="px-4 mt-8">
        <div className="flex items-center justify-center gap-2 mb-4">
          <CountDown unit="Hours" number={hour} />
          <CountDown unit="Minutes" number={minute} />
          <CountDown unit="Seconds" number={second} />
        </div>
        <button
          type="button"
          className="flex gap-2 items-center justify-center w-full bg-main hover:bg-gray-800 text-white font-medium py-2"
        >
          <AiOutlineMenu />
          <span>Option</span>
        </button>
      </div>
    </div>
  )
}

export default memo(DealDaily)
