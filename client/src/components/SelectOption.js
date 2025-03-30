import React from "react"

const SelectOption = ({ icon }) => {
  return (
    <div className="w-10 h-10 bg-white rounded-full border shadow-md flex items-center justify-center cursor-pointer hover:scale-110 transition-all duration-200 ease-in-out hover:bg-gray-800 hover:text-white">
      {icon}
    </div>
  )
}

export default SelectOption
