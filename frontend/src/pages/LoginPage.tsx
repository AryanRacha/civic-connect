import type React from "react";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { Button } from "../components/ui/Button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/Card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/Label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { Shield, Eye, EyeOff, CheckCircle, X } from "lucide-react";

interface FormData {
  email: string;
  password: string;
  role: string;
}

interface ValidationState {
  email: boolean | null;
  password: boolean | null;
  role: boolean | null;
}

type FieldName = keyof FormData;

export default function LoginPage() {
  const navigate = useNavigate();
  const { login, isLoading } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
    role: "",
  });
  const [validation, setValidation] = useState<ValidationState>({
    email: null,
    password: null,
    role: null,
  });

  const validateField = (field: FieldName, value: string): boolean => {
    switch (field) {
      case "email":
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
      case "password":
        return value.length >= 6;
      case "role":
        return value.length > 0;
      default:
        return false;
    }
  };

  const handleInputChange = (field: FieldName, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));

    if (value.length > 0) {
      setValidation((prev) => ({
        ...prev,
        [field]: validateField(field, value),
      }));
    } else {
      setValidation((prev) => ({ ...prev, [field]: null }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setIsSubmitting(true);
      await login(formData.email, formData.password, formData.role);
      navigate("/dashboard");
    } catch (error) {
      console.error("Login error:", error);
      // You could add error state here to show user-friendly error messages
    } finally {
      setIsSubmitting(false);
    }
  };
  const ValidationIcon = ({ isValid }: { isValid: boolean | null }) => {
    if (isValid === null) return null;
    return isValid ? (
      <CheckCircle className="w-5 h-5 text-green-500" />
    ) : (
      <X className="w-5 h-5 text-red-500" />
    );
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
            <CardTitle className="text-2xl font-bold text-gray-900">
              Welcome Back
            </CardTitle>
            <p className="text-gray-600">
              Sign in to your account to continue reporting and tracking civic
              issues.
            </p>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email */}
            <div className="space-y-2">
              <Label
                htmlFor="email"
                className="text-sm font-medium text-gray-700"
              >
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
                  required
                />
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  <ValidationIcon isValid={validation.email} />
                </div>
              </div>
            </div>

            {/* Role */}
            <div className="space-y-2">
              <Label
                htmlFor="role"
                className="text-sm font-medium text-gray-700"
              >
                Role
              </Label>
              <div className="relative">
                <Select
                  value={formData.role}
                  onValueChange={(value) => handleInputChange("role", value)}
                  required
                >
                  <SelectTrigger className="h-12 border-gray-300 focus:border-blue-500 focus:ring-blue-500">
                    <SelectValue placeholder="Select your role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="citizen">Citizen</SelectItem>
                    <SelectItem value="municipal_admin">
                      Municipal Admin
                    </SelectItem>
                  </SelectContent>
                </Select>
                <div className="absolute right-10 top-1/2 transform -translate-y-1/2">
                  <ValidationIcon isValid={validation.role} />
                </div>
              </div>
            </div>

            {/* Password */}
            <div className="space-y-2">
              <Label
                htmlFor="password"
                className="text-sm font-medium text-gray-700"
              >
                Password
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={(e) =>
                    handleInputChange("password", e.target.value)
                  }
                  className="pr-20 h-12 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                  required
                />
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center space-x-2">
                  <ValidationIcon isValid={validation.password} />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>
            </div>

            <Button
              type="submit"
              disabled={isSubmitting || isLoading}
              className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Signing In..." : "Sign In"}
            </Button>
          </form>

          <div className="text-center text-sm text-gray-600">
            Don't have an account?{" "}
            <button
              onClick={() => navigate("/signup")}
              className="text-blue-600 hover:text-blue-700 font-medium underline"
            >
              Sign up here
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
