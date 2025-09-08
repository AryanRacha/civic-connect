"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Shield, Eye, EyeOff, CheckCircle, X } from "lucide-react"
import Link from "next/link"

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    emailOrPhone: "",
    password: "",
  })
  const [validation, setValidation] = useState({
    emailOrPhone: null,
    password: null,
  })

  const validateField = (field, value) => {
    switch (field) {
      case "emailOrPhone":
        // Check if it's a valid email or 10-digit phone number
        const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
        const isPhone = /^[0-9]{10}$/.test(value)
        return isEmail || isPhone
      case "password":
        return value.length >= 8
      default:
        return false
    }
  }

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }))

    if (value.length > 0) {
      setValidation((prev) => ({
        ...prev,
        [field]: validateField(field, value),
      }))
    } else {
      setValidation((prev) => ({ ...prev, [field]: null }))
    }
  }

  const ValidationIcon = ({ isValid }) => {
    if (isValid === null) return null
    return isValid ? <CheckCircle className="w-5 h-5 text-green-500" /> : <X className="w-5 h-5 text-red-500" />
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-teal-50 flex items-center justify-center p-4">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-32 h-32 bg-blue-400 rounded-full blur-3xl"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-teal-400 rounded-full blur-2xl"></div>
        <div className="absolute bottom-20 left-1/3 w-40 h-40 bg-cyan-400 rounded-full blur-3xl"></div>
      </div>

      <Card className="w-full max-w-md shadow-2xl border-0 relative">
        <CardHeader className="text-center space-y-4 pb-8">
          <div className="flex justify-center">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-teal-600 rounded-2xl flex items-center justify-center shadow-lg">
              <Shield className="w-8 h-8 text-white" />
            </div>
          </div>
          <div className="space-y-2">
            <CardTitle className="text-2xl font-bold text-gray-900">Welcome Back</CardTitle>
            <p className="text-gray-600">Sign in to your account to continue reporting and tracking civic issues.</p>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="space-y-4">
            {/* Email or Phone */}
            <div className="space-y-2">
              <Label htmlFor="emailOrPhone" className="text-sm font-medium text-gray-700">
                Email ID or Phone Number
              </Label>
              <div className="relative">
                <Input
                  id="emailOrPhone"
                  type="text"
                  placeholder="e.g., user@example.com or 9876543210"
                  value={formData.emailOrPhone}
                  onChange={(e) => handleInputChange("emailOrPhone", e.target.value)}
                  className="pr-10 h-12 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                />
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  <ValidationIcon isValid={validation.emailOrPhone} />
                </div>
              </div>
            </div>

            {/* Password */}
            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-medium text-gray-700">
                Password
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={(e) => handleInputChange("password", e.target.value)}
                  className="pr-20 h-12 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                />
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center space-x-2">
                  <ValidationIcon isValid={validation.password} />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>
            </div>

            {/* Forgot Password Link */}
            <div className="text-right">
              <Link href="#" className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                Forgot Password?
              </Link>
            </div>
          </div>

          <Button className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-lg">
            Sign In
          </Button>

          <div className="text-center text-sm text-gray-600">
            Don't have an account?{" "}
            <Link href="/signup" className="text-blue-600 hover:text-blue-700 font-medium">
              Sign up here
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
