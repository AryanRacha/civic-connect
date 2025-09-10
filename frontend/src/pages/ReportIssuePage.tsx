import type React from "react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Button } from "../components/ui/Button"
import { Card } from "../components/ui/Card"
import { Input } from "../components/ui/input"
import { Label } from "../components/ui/Label"
import { ImageUploader } from "../components/ImageUploader"
import { useLocation } from "../hooks/useLocation"
import { MapPin, Loader2 } from "lucide-react"

const ReportIssuePage: React.FC = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    images: [] as File[],
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const { latitude, longitude, loading, error, getCurrentLocation } = useLocation()

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleImagesChange = (images: File[]) => {
    setFormData((prev) => ({ ...prev, images }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))

    console.log("Report submitted:", {
      ...formData,
      location: { latitude, longitude },
    })

    setIsSubmitting(false)
    // Reset form or navigate away
    setFormData({ title: "", description: "", images: [] })
  }

  const isFormValid = formData.title.trim() && formData.description.trim()

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-teal-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Report a Civic Issue</h1>
          <p className="text-gray-600">Help improve your community by reporting issues that need attention.</p>
        </div>

        <div className="max-w-2xl mx-auto">
          <Card className="p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Issue Title */}
              <div className="space-y-2">
                <Label htmlFor="title">Issue Title</Label>
                <Input
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  placeholder="e.g., Pothole on Main Street"
                  required
                />
              </div>

              {/* Description */}
              <div className="space-y-2">
                <Label htmlFor="description">Detailed Description</Label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Describe the issue in detail..."
                  rows={4}
                  className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 resize-none"
                  required
                />
              </div>

              {/* Images */}
              <div className="space-y-2">
                <Label>Upload Images</Label>
                <ImageUploader onImagesChange={handleImagesChange} />
              </div>

              {/* Location */}
              <div className="space-y-2">
                <Label>Location</Label>
                <Card className="p-4 bg-gray-50">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <MapPin className="h-4 w-4 text-gray-500" />
                      <div>
                        {loading ? (
                          <span className="text-sm text-gray-600">Getting location...</span>
                        ) : latitude && longitude ? (
                          <div>
                            <div className="text-sm font-medium text-gray-900">Location detected</div>
                            <div className="text-xs text-gray-500">
                              {latitude.toFixed(6)}, {longitude.toFixed(6)}
                            </div>
                          </div>
                        ) : (
                          <span className="text-sm text-gray-600">{error || "Location not detected"}</span>
                        )}
                      </div>
                    </div>
                    <Button type="button" variant="outline" size="sm" onClick={getCurrentLocation} disabled={loading}>
                      {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Get Location"}
                    </Button>
                  </div>
                  {error && <div className="mt-2 text-xs text-red-600">{error}</div>}
                </Card>
              </div>

              {/* Submit Button */}
              <div className="flex space-x-4">
                <Button type="submit" disabled={!isFormValid || isSubmitting} className="flex-1">
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Submitting Report...
                    </>
                  ) : (
                    "Submit Report"
                  )}
                </Button>
                <Button type="button" variant="outline" onClick={() => navigate('/dashboard')}>
                  Cancel
                </Button>
              </div>
            </form>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default ReportIssuePage
