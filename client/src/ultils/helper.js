import icons from "./icons"

const { AiFillStar, AiOutlineStar } = icons
export const createSlug = (string) =>
  string
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .split(" ")
    .join("-")
export const formatCurrency = (number) =>
  Number(number?.toFixed(1)).toLocaleString()
export const renderStarFromNumber = (number, size) => {
  if (!Number(number)) return
  const stars = []
  for (let i = 0; i < +number; i++)
    stars.push(<AiFillStar color="gold" size={size || 16} />)
  for (let i = 5; i > +number; i--)
    stars.push(<AiOutlineStar color="gray" size={size || 16} />)
  return stars
}
export function secondToHms(d) {
  d = Number(d) / 1000
  const h = Math.floor(d / 3600)
  const m = Math.floor((d % 3600) / 60)
  const s = Math.floor(d % 60)
  return { h, m, s }
}
export const validate = (payload, setInvalidFields) => {
  let invalids = 0
  setInvalidFields([]) // Reset invalidFields trước khi validate
  const formatPayload = Object.entries(payload)

  for (let arr of formatPayload) {
    if (arr[1].trim() === "") {
      invalids++
      setInvalidFields((prev) => [
        ...prev,
        { name: arr[0], mes: "This field is required" },
      ])
    }
  }
  // for (let arr of formatPayload) {
  //   switch (arr[0]) {
  //     case "email":
  //       if (!/\S+@\S+\.\S+/.test(arr[1])) {
  //         invalids++
  //         setInvalidFields((prev) => [
  //           ...prev,
  //           { name: arr[0], mes: "Email is not valid" },
  //         ])
  //       }
  //       break
  //     case "password":
  //       if (arr[1].length < 8) {
  //         invalids++
  //         setInvalidFields((prev) => [
  //           ...prev,
  //           { name: arr[0], mes: "Password must be at least 8 characters" },
  //         ])
  //       }
  //       break
  //     case "mobile":
  //       if (!/^\d{10}$/.test(arr[1])) {
  //         invalids++
  //         setInvalidFields((prev) => [
  //           ...prev,
  //           { name: arr[0], mes: "Mobile number is not valid" },
  //         ])
  //       }
  //       break
  //     default:
  //       break
  //   }
  // }

  return invalids
}
