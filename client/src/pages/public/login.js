import React, { useState, useCallback, useEffect } from "react"
import { InputField, Button } from "../../components"
import {
  apiRegister,
  apiLogin,
  apiForgotPassword,
  apiFinalRegister,
} from "../../apis/user"
import Swal from "sweetalert2"
import { useNavigate } from "react-router-dom"
import path from "../../ultils/path"
import { login } from "../../store/user/userSlice"
import { useDispatch } from "react-redux"
import { toast } from "react-toastify"
import { validate } from "../../ultils/helper"

const Login = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [payload, setPayload] = useState({
    email: "",
    password: "",
    firstname: "",
    lastname: "",
    mobile: "",
  })
  const [isVerifyEmail, setIsVerifyEmail] = useState(false)
  const [invalidFields, setInvalidFields] = useState([])
  const [isForgotPassword, setIsForgotPassword] = useState(false)
  const [isRegister, setIsRegister] = useState(false)
  const resetPayload = () => {
    setPayload({
      email: "",
      password: "",
      firstname: "",
      lastname: "",
      mobile: "",
    })
  }
  const [token, setToken] = useState("")
  const [email, setEmail] = useState("")
  const handleForgotPassword = async () => {
    const response = await apiForgotPassword({ email })
    console.log(response)
    if (response.success) {
      toast.success(response.mes, { theme: "colored" })
    } else {
      toast.info(response.mes, { theme: "colored" })
    }
  }
  useEffect(() => {
    resetPayload()
  }, [isRegister])
  const handleSubmit = useCallback(async () => {
    const { firstname, lastname, mobile, ...data } = payload
    const invalids = isRegister
      ? validate(payload, setInvalidFields)
      : validate(data, setInvalidFields)
    if (invalids === 0) {
      if (isRegister) {
        const response = await apiRegister(payload)
        if (response.success) {
          setIsVerifyEmail(true)
        } else Swal.fire("Oops!", response.mes, "error")
      } else {
        const rs = await apiLogin(data)
        if (rs.success) {
          dispatch(
            login({
              isLoggedIn: true,
              token: rs.accessToken,
              userData: rs.userData,
            })
          )
          navigate(`/${path.HOME}`)
        } else Swal.fire("Oops!", rs.mes, "error")
      }
    }
  }, [payload, isRegister])
  const finalRegister = async () => {
    const response = await apiFinalRegister(token)
    if (response.success) {
      Swal.fire("Congratulations!", response.mes, "success").then(() => {
        setIsRegister(false)
        resetPayload()
      })
    } else Swal.fire("Oops!", response.mes, "error")
    setIsVerifyEmail(false)
    setToken("")
  }
  return (
    <div className="w-screen h-screen relative ">
      {isVerifyEmail && (
        <div className="absolute top-0 left-0 right-0 bottom-0 bg-overlay z-50 flex items-center justify-center flex-col">
          <div className="bg-white w-[500px] rounded-md p-8">
            <h4>Please check your mail and fill code </h4>
            <input
              type="text"
              value={token}
              onChange={(e) => setToken(e.target.value)}
              className="p-2 border rounded-md outline-none"
            ></input>
            <button
              type="button"
              className="px-4 py-2 bg-blue-500 font-semibold text-white rounded-md hover:bg-blue-600 transition-all ml-4"
              onClick={finalRegister}
            >
              Submit
            </button>
          </div>
        </div>
      )}
      {isForgotPassword && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 animate-fade-in">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4 animate-slide-up overflow-hidden">
            <div className="bg-main p-4 text-white">
              <h2 className="text-xl font-semibold">Reset Your Password</h2>
            </div>
            <div className="p-6">
              <p className="text-gray-600 mb-4">
                Enter your email address and we'll send you instructions to
                reset your password.
              </p>
              <div className="flex flex-col gap-2">
                <label htmlFor="email" className="font-medium text-gray-700">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full border border-gray-300 rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-main/50 focus:border-main transition-all"
                  placeholder="your.email@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="flex items-center justify-end gap-3 mt-6">
                <Button
                  name="Cancel"
                  handleOnClick={() => setIsForgotPassword(false)}
                  style="px-4 py-2 rounded-md border border-gray-300 hover:bg-gray-100 transition-all"
                />
                <Button
                  name="Reset Password"
                  handleOnClick={handleForgotPassword}
                  style="px-4 py-2 rounded-md text-white bg-main hover:bg-main/90 transition-all font-medium"
                />
              </div>
            </div>
          </div>
        </div>
      )}
      <img
        src="https://img.freepik.com/premium-photo/shoping-cart-card-icon-discounts_116441-26066.jpg"
        alt="Shopping Cart Icon"
        className="w-full h-full object-cover"
      />
      <div className="absolute top-0 left-0 bottom-0 right-1/2 flex items-center justify-center">
        <div className="p-8 bg-white flex flex-col items-center rounded-md min-w-[500px] ">
          <h1 className="text-[28px] font-semibold text-main mb-8">
            {isRegister ? "Register" : "Login"}
          </h1>
          {isRegister && (
            <div className="flex items-center gap-2">
              <InputField
                value={payload.firstname}
                setValue={setPayload}
                nameKey="firstname"
                invalidFields={invalidFields}
                setInvalidFields={setInvalidFields}
              />
              <InputField
                value={payload.lastname}
                setValue={setPayload}
                nameKey="lastname"
                invalidFields={invalidFields}
                setInvalidFields={setInvalidFields}
              />
            </div>
          )}
          {isRegister && (
            <InputField
              value={payload.mobile}
              setValue={setPayload}
              nameKey="mobile"
              invalidFields={invalidFields}
              setInvalidFields={setInvalidFields}
            />
          )}
          <InputField
            value={payload.email}
            setValue={setPayload}
            nameKey="email"
            invalidFields={invalidFields}
            setInvalidFields={setInvalidFields}
          />
          <InputField
            value={payload.password}
            setValue={setPayload}
            nameKey="password"
            type="password"
            invalidFields={invalidFields}
            setInvalidFields={setInvalidFields}
          />
          <Button
            name={isRegister ? "Register" : "Login"}
            handleOnClick={handleSubmit}
            fw
          />
          <div className="flex items-center justify-between w-full my-2 text-sm">
            {!isRegister && (
              <span
                onClick={() => setIsForgotPassword(true)}
                className="text-blue-500 hover:underline cursor-pointer"
              >
                Forgot your account?
              </span>
            )}
            {!isRegister && (
              <span
                className="text-blue-500 hover:underline cursor-pointer"
                onClick={() => setIsRegister(true)}
              >
                Create account
              </span>
            )}
            {isRegister && (
              <span
                className="text-blue-500 hover:underline cursor-pointer w-full text-center"
                onClick={() => setIsRegister(false)}
              >
                Go back to login
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
