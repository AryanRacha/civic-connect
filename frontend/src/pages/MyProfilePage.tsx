"use client"

import type React from "react"
import { useState } from "react"
import { useAuth } from "../contexts/AuthContext"
import { Button } from "../components/ui/Button"
import { Card, CardContent } from "../components/ui/Card"
import { Input } from "../components/ui/input"
import { Label } from "../components/ui/Label"
import {
  Home,
  Plus,
  User,
  Users,
  LogOut,
  Menu,
  X,
  Edit3,
  MapPin,
  Phone,
  Mail,
  Calendar,
  Award,
  ThumbsUp,
  CheckCircle,
  Clock,
  Camera,
} from "lucide-react"
import { useNavigate } from "react-router-dom"

// Define the props interface, similar to BrowseIssuesPageProps


// Accept the props in the component function
export default function MyProfilePage() {
  const navigate = useNavigate()
  const { user, logout, updateUser } = useAuth()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [profileData, setProfileData] = useState({
    name: user?.fullName || "",
    email: user?.email || "",
    phone: user?.phone || "",
    address: user?.address || "",
    joinDate: user?.joinDate || "January 2024",
    bio: user?.bio || "Active citizen committed to improving community infrastructure and civic services.",
  })

  // Mock user statistics
  const userStats = {
    issuesReported: 12,
    issuesResolved: 8,
    communityUpvotes: 45,
    impactScore: 92,
  }

  // Mock recent activity
  const recentActivity = [
    {
      id: 1,
      type: "reported",
      title: "Broken streetlight on MG Road",
      date: "2024-01-20",
      status: "in-progress",
    },
    {
      id: 2,
      type: "resolved",
      title: "Pothole near City Hospital",
      date: "2024-01-18",
      status: "resolved",
    },
    {
      id: 3,
      type: "upvoted",
      title: "Water supply disruption in Sector 15",
      date: "2024-01-15",
      status: "in-progress",
    },
  ]

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setProfileData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSave = () => {
    // Update user data in auth context
    updateUser({
      fullName: profileData.name,
      email: profileData.email,
      phone: profileData.phone,
      address: profileData.address,
      bio: profileData.bio,
    })
    setIsEditing(false)
    // Here you would typically save to backend
    console.log("Profile updated:", profileData)
  }

  const getActivityIcon = (type: string) => {
    if (type === "reported") return <Plus className="w-4 h-4 text-blue-600" />
    if (type === "resolved") return <CheckCircle className="w-4 h-4 text-green-600" />
    if (type === "upvoted") return <ThumbsUp className="w-4 h-4 text-orange-600" />
    return <Clock className="w-4 h-4 text-gray-600" />
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "resolved":
        return "bg-green-100 text-green-800 border-green-200"
      case "in-progress":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "rejected":
        return "bg-red-100 text-red-800 border-red-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0`}
      >
        <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-teal-600 rounded-lg flex items-center justify-center">
              <Home className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">CivicConnect</span>
          </div>
          <button onClick={() => setSidebarOpen(false)} className="lg:hidden">
            <X className="w-6 h-6 text-gray-600" />
          </button>
        </div>

        <nav className="mt-8 px-4 space-y-2">
          <button
            onClick={() => navigate('/dashboard')} 
            className="flex items-center space-x-3 px-4 py-3 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors w-full text-left"
          >
            <Home className="w-5 h-5" />
            <span className="font-medium">Dashboard</span>
          </button>
          <button
            onClick={() => navigate('/report-issue')} 
            className="flex items-center space-x-3 px-4 py-3 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors w-full text-left"
          >
            <Plus className="w-5 h-5" />
            <span className="font-medium">Report Issue</span>
          </button>
          {/* My Profile is current page, so no navigation needed for it */}
          <a href="#" className="flex items-center space-x-3 px-4 py-3 text-blue-600 bg-blue-50 rounded-lg">
            <User className="w-5 h-5" />
            <span className="font-medium">My Profile</span>
          </a>
          <button
            onClick={() => navigate('/browse-issues')} 
            className="flex items-center space-x-3 px-4 py-3 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors w-full text-left"
          >
            <Users className="w-5 h-5" />
            <span className="font-medium">Browse Issues</span>
          </button>
        </nav>

        <div className="absolute bottom-4 left-4 right-4">
          <Button
            variant="outline"
            className="w-full justify-start text-gray-600 border-gray-300 hover:bg-gray-50 bg-transparent"
            onClick={logout}
          >
            <LogOut className="w-5 h-5 mr-3" />
            Log Out
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 lg:ml-0">
        {/* Mobile Header */}
        <div className="lg:hidden bg-white border-b border-gray-200 px-4 py-3">
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-2 rounded-md text-gray-600 hover:text-blue-600 hover:bg-blue-50"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6 lg:p-8 space-y-8">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl lg:text-4xl font-bold text-gray-900">My Profile</h1>
              <p className="text-lg text-gray-600 mt-2">Manage your civic engagement profile and track your impact</p>
            </div>
            <Button
              onClick={() => (isEditing ? handleSave() : setIsEditing(true))}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3"
            >
              <Edit3 className="w-5 h-5 mr-2" />
              {isEditing ? "Save Changes" : "Edit Profile"}
            </Button>
          </div>

          {/* Profile Overview */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Profile Info */}
            <div className="lg:col-span-2">
              <Card className="border-0 shadow-lg">
                <CardContent className="p-6 lg:p-8">
                  <div className="flex items-start space-x-6">
                    {/* Profile Picture */}
                    <div className="relative">
                      <div className="w-24 h-24 bg-gradient-to-br from-blue-600 to-teal-600 rounded-full flex items-center justify-center">
                        <User className="w-12 h-12 text-white" />
                      </div>
                      {isEditing && (
                        <button className="absolute -bottom-2 -right-2 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white hover:bg-blue-700">
                          <Camera className="w-4 h-4" />
                        </button>
                      )}
                    </div>

                    {/* Profile Details */}
                    <div className="flex-1 space-y-4">
                      {isEditing ? (
                        <div className="space-y-4">
                          <div>
                            <Label htmlFor="name">Full Name</Label>
                            <Input id="name" name="name" value={profileData.name} onChange={handleInputChange} />
                          </div>
                          <div>
                            <Label htmlFor="email">Email</Label>
                            <Input
                              id="email"
                              name="email"
                              type="email"
                              value={profileData.email}
                              onChange={handleInputChange}
                            />
                          </div>
                          <div>
                            <Label htmlFor="phone">Phone</Label>
                            <Input id="phone" name="phone" value={profileData.phone} onChange={handleInputChange} />
                          </div>
                          <div>
                            <Label htmlFor="address">Address</Label>
                            <Input
                              id="address"
                              name="address"
                              value={profileData.address}
                              onChange={handleInputChange}
                            />
                          </div>
                          <div>
                            <Label htmlFor="bio">Bio</Label>
                            <textarea
                              id="bio"
                              name="bio"
                              value={profileData.bio}
                              onChange={handleInputChange}
                              rows={3}
                              className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 resize-none"
                            />
                          </div>
                        </div>
                      ) : (
                        <div className="space-y-4">
                          <div>
                            <h2 className="text-2xl font-bold text-gray-900">{profileData.name}</h2>
                            <p className="text-gray-600 mt-1">{profileData.bio}</p>
                          </div>
                          <div className="space-y-2">
                            <div className="flex items-center space-x-2 text-gray-600">
                              <Mail className="w-4 h-4" />
                              <span>{profileData.email}</span>
                            </div>
                            <div className="flex items-center space-x-2 text-gray-600">
                              <Phone className="w-4 h-4" />
                              <span>{profileData.phone}</span>
                            </div>
                            <div className="flex items-center space-x-2 text-gray-600">
                              <MapPin className="w-4 h-4" />
                              <span>{profileData.address}</span>
                            </div>
                            <div className="flex items-center space-x-2 text-gray-600">
                              <Calendar className="w-4 h-4" />
                              <span>Member since {profileData.joinDate}</span>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Impact Score */}
            <div>
              <Card className="border-0 shadow-lg">
                <CardContent className="p-6">
                  <div className="text-center space-y-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-green-100 to-green-200 rounded-full flex items-center justify-center mx-auto">
                      <Award className="w-8 h-8 text-green-600" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900">{userStats.impactScore}</h3>
                      <p className="text-gray-600">Civic Impact Score</p>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-green-500 to-green-600 h-2 rounded-full"
                        style={{ width: `${userStats.impactScore}%` }}
                      ></div>
                    </div>
                    <p className="text-sm text-gray-500">Based on your civic engagement and community contributions</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl flex items-center justify-center">
                    <Plus className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-900">{userStats.issuesReported}</p>
                    <p className="text-gray-600">Issues Reported</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-100 to-green-200 rounded-xl flex items-center justify-center">
                    <CheckCircle className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-900">{userStats.issuesResolved}</p>
                    <p className="text-gray-600">Issues Resolved</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-orange-100 to-orange-200 rounded-xl flex items-center justify-center">
                    <ThumbsUp className="w-6 h-6 text-orange-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-900">{userStats.communityUpvotes}</p>
                    <p className="text-gray-600">Community Upvotes</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Activity */}
          <Card className="border-0 shadow-lg">
            <CardContent className="p-6 lg:p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Recent Activity</h3>
              <div className="space-y-4">
                {recentActivity.map((activity) => (
                  <div key={activity.id} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                    <div className="flex-shrink-0">{getActivityIcon(activity.type)}</div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">{activity.title}</p>
                      <p className="text-sm text-gray-500">
                        {activity.type === "reported" && "Reported"}
                        {activity.type === "resolved" && "Resolved"}
                        {activity.type === "upvoted" && "Upvoted"}
                        on {new Date(activity.date).toLocaleDateString()}
                      </p>
                    </div>
                    <span
                      className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(activity.status)}`}
                    >
                      {activity.status.replace("-", " ")}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Overlay for mobile sidebar */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}
    </div>
  )
}