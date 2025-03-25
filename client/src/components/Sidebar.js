import React, { useState, useEffect } from "react"
import { apiGetCatgories } from "../apis/app"

const Sidebar = () => {
  const [categories, setcategories] = useState(null)
  const fetchCatgories = async () => {
    const response = await apiGetCatgories()
    if (response.success) setcategories(response.getProductCategory)
  }
  useEffect(() => {
    fetchCatgories()
  }, [])
  console.log(categories)
  return <div>Sidebar</div>
}

export default Sidebar
