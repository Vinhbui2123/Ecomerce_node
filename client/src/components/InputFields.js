import React from "react"

const InputField = ({
  value,
  setValue,
  nameKey,
  type,
  invalidFields,
  setInvalidFields,
}) => {
  const handleChange = (e) => {
    const newValue = e.target.value
    setValue((prev) => ({ ...prev, [nameKey]: newValue }))
    
    // Nếu có giá trị, xóa thông báo lỗi của trường này
    if (newValue.trim() !== "") {
      setInvalidFields((prev) => prev.filter((item) => item.name !== nameKey))
    }
  }

  return (
    <div className="w-full flex flex-col relative mb-2">
      {value.trim() !== "" && (
        <label
          className="text-[10px] animate-slide-top-sm absolute top-0 left-[12px] block bg-white px-1"
          htmlFor={nameKey}
        >
          {nameKey?.slice(0, 1).toUpperCase() + nameKey?.slice(1)}
        </label>
      )}
      <input
        type={type || "text"}
        className="px-4 py-2 rounded-sm border mt-2 w-full placeholder:text-sm placeholder:italic outline-none"
        placeholder={nameKey?.slice(0, 1).toUpperCase() + nameKey?.slice(1)}
        value={value}
        onChange={handleChange}
        onFocus={() => {
          // Chỉ xóa thông báo lỗi của trường hiện tại
          setInvalidFields((prev) => prev.filter((item) => item.name !== nameKey))
        }}
      />
      {invalidFields?.some((el) => el.name === nameKey) && (
        <small className="text-main italic">
          {invalidFields.find((el) => el.name === nameKey)?.mes}
        </small>
      )}
    </div>
  )
}

export default InputField