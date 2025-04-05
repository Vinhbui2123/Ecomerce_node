import React, { useState } from "react"
import { Button } from "../../components"
import { useParams, useNavigate } from "react-router-dom"
import { apiResetPassword } from "../../apis/user"
import { toast } from "react-toastify"
import path from "../../ultils/path"
import { Link } from "react-router-dom"

const ResetPassword = () => {
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const { token } = useParams()
  const navigate = useNavigate()

  const handleResetPassword = async () => {
    if (!password) {
      toast.error("Please enter a new password", { theme: "colored" })
      return
    }

    setIsLoading(true)
    const response = await apiResetPassword({ password, token })

    if (response.success) {
      toast.success(response.mes, { theme: "colored" })
      // Set timeout to show success message before redirecting
      setTimeout(() => {
        navigate(`/${path.LOGIN}`)
      }, 1500)
    } else {
      toast.info(response.mes, { theme: "colored" })
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg animate-fade-in">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            Reset Your Password
          </h1>
          <p className="text-gray-600">Please enter your new password below</p>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              New Password
            </label>
            <div className="relative">
              <input
                type="password"
                id="password"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                placeholder="Enter a secure password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Password should be at least 8 characters with letters and numbers
            </p>
          </div>

          <div className="pt-4">
            <Button
              name={isLoading ? "Processing..." : "Reset Password"}
              handleOnClick={handleResetPassword}
              style="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              disabled={isLoading}
            />
          </div>

          <div className="text-center mt-4">
            <Link
              to="/login"
              className="text-sm text-blue-600 hover:text-blue-800 hover:underline"
            >
              Return to login page
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ResetPassword
