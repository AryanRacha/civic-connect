"use client"

import { useState } from "react"
import { Button } from "../components/ui/Button"
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/Card"
import { Input } from "../components/ui/input"
import { Label } from "../components/ui/Label"
import { Shield, Eye, EyeOff, CheckCircle, X } from "lucide-react"

interface FormData {
  fullName: string
  email: string
  phone: string
  password: string
  confirmPassword: string
}

interface ValidationState {
  fullName: boolean | null
  email: boolean | null
  phone: boolean | null
  password: boolean | null
  confirmPassword: boolean | null
}

type FieldName = keyof FormData

interface SignupPageProps {
  onNavigateToLanding: () => void
  onNavigateToLogin: () => void
}

export default function SignupPage({ onNavigateToLanding, onNavigateToLogin }: SignupPageProps) {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  })
  const [validation, setValidation] = useState<ValidationState>({
    fullName: null,
    email: null,
    phone: null,
    password: null,
    confirmPassword: null,
  })
  const [passwordMatchError, setPasswordMatchError] = useState("")
  const [loading, setLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")

  const validateField = (field: FieldName, value: string): boolean => {
    switch (field) {
      case "fullName":
        return value.length >= 2
      case "email":
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
      case "phone":
        return /^[0-9]{10}$/.test(value)
      case "password":
        return value.length >= 6
      case "confirmPassword":
        return value === formData.password && value.length > 0
      default:
        return false
    }
  }

  const handleInputChange = (field: FieldName, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))

    if (value.length > 0) {
      setValidation((prev) => ({
        ...prev,
        [field]: validateField(field, value),
      }))
    } else {
      setValidation((prev) => ({ ...prev, [field]: null }))
    }

    if (field === "confirmPassword" || field === "password") {
      if (field === "confirmPassword" && value.length > 0 && value !== formData.password) {
        setPasswordMatchError("Passwords do not match.")
      } else if (
        field === "password" &&
        value.length > 0 &&
        value !== formData.confirmPassword &&
        formData.confirmPassword.length > 0
      ) {
        setPasswordMatchError("Passwords do not match.")
      } else {
        setPasswordMatchError("")
      }
    }
  }

  const ValidationIcon = ({ isValid }: { isValid: boolean | null }) => {
    if (isValid === null) return null
    return isValid ? <CheckCircle className="w-5 h-5 text-green-500" /> : <X className="w-5 h-5 text-red-500" />
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");

    const isFormValid = Object.values(validation).every((isValid) => isValid) && formData.password === formData.confirmPassword;
    if (!isFormValid) {
      setErrorMessage("Please correct the form errors.");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.fullName,
          email: formData.email,
          phone_no: formData.phone,
          password: formData.password,
          role_id: "sih_citizen", // This is the key change
        }),
      });

      const data = await response.json();
      if (data.success) {
        onNavigateToLogin();
      } else {
        setErrorMessage(data.message || "Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error("Signup failed:", error);
      setErrorMessage("Network error. Please check your connection.");
    } finally {
      setLoading(false);
    }
  };

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
            <CardTitle className="text-2xl font-bold text-gray-900">Create Your Account</CardTitle>
            <p className="text-gray-600">Get started by creating your profile to report and track civic issues.</p>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              {/* Full Name */}
              <div className="space-y-2">
                <Label htmlFor="fullName" className="text-sm font-medium text-gray-700">
                  Full Name
                </Label>
                <div className="relative">
                  <Input
                    id="fullName"
                    type="text"
                    placeholder="e.g., Jane Doe"
                    value={formData.fullName}
                    onChange={(e) => handleInputChange("fullName", e.target.value)}
                    className="pr-10 h-12 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                  />
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                    <ValidationIcon isValid={validation.fullName} />
                  </div>
                </div>
              </div>

              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                  Email ID
                </Label>
                <div className="relative">
                  <Input
                    id="email"
                    type="email"
                    placeholder="e.g., user@example.com"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    className="pr-10 h-12 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                  />
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                    <ValidationIcon isValid={validation.email} />
                  </div>
                </div>
              </div>

              {/* Phone */}
              <div className="space-y-2">
                <Label htmlFor="phone" className="text-sm font-medium text-gray-700">
                  Phone Number
                </Label>
                <div className="relative">
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="e.g., 9876543210"
                    value={formData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    className="pr-10 h-12 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                  />
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                    <ValidationIcon isValid={validation.phone} />
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
                    placeholder="Enter your password (min 6 characters)"
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

              {/* Confirm Password */}
              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-sm font-medium text-gray-700">
                  Confirm Password
                </Label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm your password"
                    value={formData.confirmPassword}
                    onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                    className="pr-20 h-12 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                  />
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center space-x-2">
                    <ValidationIcon isValid={validation.confirmPassword} />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="text-gray-400 hover:text-gray-600"
                    >
                      {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>
                {passwordMatchError && <p className="text-red-500 text-sm mt-1">{passwordMatchError}</p>}
              </div>
            </div>

            {errorMessage && (
              <div className="mt-4 text-center text-red-500 text-sm">{errorMessage}</div>
            )}

            <Button
              type="submit"
              className="w-full h-12 mt-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-lg"
              disabled={loading}
            >
              {loading ? "Creating..." : "Create Account"}
            </Button>
          </form>

          <div className="text-center text-sm text-gray-600">
            Already have an account?{" "}
            <button onClick={onNavigateToLogin} className="text-blue-600 hover:text-blue-700 font-medium underline">
              Login here
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}