import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Button } from "../components/ui/Button"
import { Card, CardContent } from "../components/ui/Card"
import ChatbotInterface from "../components/ChatbotInterface"
import {
  Home,
  Plus,
  User,
  Users,
  LogOut,
  MapPin,
  ThumbsUp,
  Clock,
  CheckCircle,
  XCircle,
  TrendingUp,
  Award,
  Filter,
  Menu,
  X,
} from "lucide-react"

export default function DashboardPage() {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState("all")
  const [sidebarOpen, setSidebarOpen] = useState(false)

  // Mock data
  const userStats = {
    issuesReported: 12,
    issuesResolved: 8,
    communityUpvotes: 45,
  }

  const userIssues = [
    {
      id: "CIV-2024-001",
      title: "Broken streetlight on MG Road",
      status: "resolved",
      date: "2024-01-15",
      upvotes: 23,
      description: "Street light has been non-functional for 2 weeks",
    },
    {
      id: "CIV-2024-002",
      title: "Pothole near City Hospital",
      status: "in-progress",
      date: "2024-01-18",
      upvotes: 15,
      description: "Large pothole causing traffic issues",
    },
    {
      id: "CIV-2024-003",
      title: "Garbage collection missed",
      status: "rejected",
      date: "2024-01-20",
      upvotes: 8,
      description: "Garbage not collected for 3 days in residential area",
    },
  ]

  const trendingIssues = [
    { id: 1, title: "Water supply disruption in Sector 15", upvotes: 89, location: "Sector 15" },
    { id: 2, title: "Traffic signal malfunction at Main Square", upvotes: 67, location: "Main Square" },
    { id: 3, title: "Park maintenance required", upvotes: 45, location: "Central Park" },
  ]

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

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "resolved":
        return <CheckCircle className="w-4 h-4" />
      case "in-progress":
        return <Clock className="w-4 h-4" />
      case "rejected":
        return <XCircle className="w-4 h-4" />
      default:
        return <Clock className="w-4 h-4" />
    }
  }

  const filteredIssues = userIssues.filter((issue) => {
    if (activeTab === "all") return true
    return issue.status === activeTab.replace("-", "-")
  })

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
          <a href="#" className="flex items-center space-x-3 px-4 py-3 text-blue-600 bg-blue-50 rounded-lg">
            <Home className="w-5 h-5" />
            <span className="font-medium">Dashboard</span>
          </a>
          <button
            onClick={() => navigate('/report-issue')}
            className="flex items-center space-x-3 px-4 py-3 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors w-full text-left"
          >
            <Plus className="w-5 h-5" />
            <span className="font-medium">Report Issue</span>
          </button>
          <button
            onClick={() => navigate('/my-profile')}
            className="flex items-center space-x-3 px-4 py-3 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors w-full text-left"
          >
            <User className="w-5 h-5" />
            <span className="font-medium">My Profile</span>
          </button>
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
            onClick={() => navigate('/')}
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
          {/* Hero/Welcome Section */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl lg:text-4xl font-bold text-gray-900">Welcome, Rahul Sharma! 👋</h1>
                <p className="text-lg text-gray-600 mt-2">
                  Your voice matters. Let's build a better community together.
                </p>
              </div>
              <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3" onClick={() => navigate('/report-issue')}>
                <Plus className="w-5 h-5 mr-2" />
                Report New Issue
              </Button>
            </div>

            {/* Key Metrics */}
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
          </div>

          {/* Issue Overview Section */}
          <Card className="border-0 shadow-lg">
            <CardContent className="p-6 lg:p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">My Reported Issues</h2>
                <Button variant="outline" size="sm" className="border-gray-300 bg-transparent">
                  <Filter className="w-4 h-4 mr-2" />
                  Filter
                </Button>
              </div>

              {/* Tabs */}
              <div className="flex space-x-1 bg-gray-100 rounded-lg p-1 mb-6">
                {[
                  { id: "all", label: "All Issues" },
                  { id: "in-progress", label: "In Progress" },
                  { id: "resolved", label: "Resolved" },
                  { id: "rejected", label: "Rejected" },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex-1 px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                      activeTab === tab.id ? "bg-white text-blue-600 shadow-sm" : "text-gray-600 hover:text-gray-900"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Issue List */}
              <div className="space-y-4">
                {filteredIssues.map((issue) => (
                  <div
                    key={issue.id}
                    className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <span className="text-sm font-mono text-blue-600 bg-blue-50 px-2 py-1 rounded">
                            {issue.id}
                          </span>
                          <span
                            className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(issue.status)}`}
                          >
                            {getStatusIcon(issue.status)}
                            <span className="capitalize">{issue.status.replace("-", " ")}</span>
                          </span>
                        </div>
                        <h3 className="font-semibold text-gray-900 mb-1">{issue.title}</h3>
                        <p className="text-gray-600 text-sm mb-2">{issue.description}</p>
                        <p className="text-xs text-gray-500">Reported on {new Date(issue.date).toLocaleDateString()}</p>
                      </div>
                      <div className="flex items-center space-x-2 text-gray-500">
                        <ThumbsUp className="w-4 h-4" />
                        <span className="text-sm font-medium">{issue.upvotes}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Community & Impact Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Map Section */}
            <Card className="border-0 shadow-lg">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Community Impact</h3>
                <p className="text-gray-600 mb-4">See the most urgent issues near you</p>

                {/* Mock Map */}
                <div className="bg-gradient-to-br from-blue-50 to-teal-50 rounded-lg h-64 flex items-center justify-center border-2 border-dashed border-blue-200">
                  <div className="text-center">
                    <MapPin className="w-12 h-12 text-blue-600 mx-auto mb-2" />
                    <p className="text-gray-600 font-medium">Interactive Map</p>
                    <p className="text-sm text-gray-500">Showing nearby issues</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Trending Issues */}
            <Card className="border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center space-x-2 mb-4">
                  <TrendingUp className="w-5 h-5 text-orange-600" />
                  <h3 className="text-xl font-bold text-gray-900">Trending Issues</h3>
                </div>

                <div className="space-y-3">
                  {trendingIssues.map((issue) => (
                    <div
                      key={issue.id}
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
                    >
                      <div className="flex-1">
                        <p className="font-medium text-gray-900 text-sm">{issue.title}</p>
                        <p className="text-xs text-gray-500 flex items-center mt-1">
                          <MapPin className="w-3 h-3 mr-1" />
                          {issue.location}
                        </p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button
                          size="sm"
                          variant="outline"
                          className="border-orange-300 text-orange-600 hover:bg-orange-50 bg-transparent"
                        >
                          <ThumbsUp className="w-3 h-3 mr-1" />
                          {issue.upvotes}
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Overlay for mobile sidebar */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Chatbot Interface */}
      <ChatbotInterface />
    </div>
  )
}
