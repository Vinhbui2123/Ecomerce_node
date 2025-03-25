import axios from "../axios"
export const apiGetCatgories = () =>
  axios({
    url: "/productcategory/",
    method: "GET",
  })
