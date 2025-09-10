"use client"

import { useState } from "react"

import { Button } from "../components/ui/Button"
import { Card, CardContent } from "../components/ui/Card"
import {
  Home,
  ArrowLeft,
  MapPin,
  ThumbsUp,
  Clock,
  CheckCircle,
  XCircle,
  Filter,
  Search,
  TrendingUp,
  AlertCircle,
} from "lucide-react"

interface BrowseIssuesPageProps {
  onNavigateBack: () => void
}

export default function BrowseIssuesPage({ onNavigateBack }: BrowseIssuesPageProps) {
  const [activeFilter, setActiveFilter] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")

  // Mock data for community issues
  const communityIssues = [
    {
      id: "CIV-2024-101",
      title: "Water supply disruption in Sector 15",
      description: "No water supply for the past 3 days affecting 200+ families",
      status: "in-progress",
      date: "2024-01-20",
      upvotes: 89,
      location: "Sector 15, Chandigarh",
      priority: "high",
      category: "Water Supply",
    },
    {
      id: "CIV-2024-102",
      title: "Traffic signal malfunction at Main Square",
      description: "Traffic lights not working causing major congestion during peak hours",
      status: "reported",
      date: "2024-01-19",
      upvotes: 67,
      location: "Main Square, City Center",
      priority: "high",
      category: "Traffic",
    },
    {
      id: "CIV-2024-103",
      title: "Park maintenance required",
      description: "Broken swings and damaged pathways in the children's play area",
      status: "resolved",
      date: "2024-01-18",
      upvotes: 45,
      location: "Central Park",
      priority: "medium",
      category: "Parks & Recreation",
    },
    {
      id: "CIV-2024-104",
      title: "Street lighting issues on MG Road",
      description: "Multiple street lights not working, creating safety concerns",
      status: "in-progress",
      date: "2024-01-17",
      upvotes: 34,
      location: "MG Road",
      priority: "medium",
      category: "Street Lighting",
    },
    {
      id: "CIV-2024-105",
      title: "Garbage collection delay in residential area",
      description: "Garbage not collected for over a week in Block A",
      status: "reported",
      date: "2024-01-16",
      upvotes: 28,
      location: "Block A, Residential Complex",
      priority: "medium",
      category: "Waste Management",
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "resolved":
        return "bg-green-100 text-green-800 border-green-200"
      case "in-progress":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "reported":
        return "bg-blue-100 text-blue-800 border-blue-200"
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
      case "reported":
        return <AlertCircle className="w-4 h-4" />
      default:
        return <Clock className="w-4 h-4" />
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "text-red-600 bg-red-50"
      case "medium":
        return "text-orange-600 bg-orange-50"
      case "low":
        return "text-green-600 bg-green-50"
      default:
        return "text-gray-600 bg-gray-50"
    }
  }

  const filteredIssues = communityIssues.filter((issue) => {
    const matchesFilter = activeFilter === "all" || issue.status === activeFilter
    const matchesSearch = issue.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         issue.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         issue.location.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesFilter && matchesSearch
  })

  const handleUpvote = (issueId: string) => {
    console.log("Upvoted issue:", issueId)
    // Handle upvote logic here
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Button
                variant="outline"
                size="sm"
                onClick={onNavigateBack}
                className="border-gray-300 bg-transparent"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Dashboard
              </Button>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-teal-600 rounded-lg flex items-center justify-center">
                  <Home className="w-5 h-5 text-white" />
                </div>
                <h1 className="text-xl font-bold text-gray-900">Browse Community Issues</h1>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Filters */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search issues by title, description, or location..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <Button variant="outline" className="border-gray-300 bg-transparent">
              <Filter className="w-4 h-4 mr-2" />
              Advanced Filters
            </Button>
          </div>

          {/* Status Filters */}
          <div className="flex flex-wrap gap-2">
            {[
              { id: "all", label: "All Issues", count: communityIssues.length },
              { id: "reported", label: "Reported", count: communityIssues.filter(i => i.status === "reported").length },
              { id: "in-progress", label: "In Progress", count: communityIssues.filter(i => i.status === "in-progress").length },
              { id: "resolved", label: "Resolved", count: communityIssues.filter(i => i.status === "resolved").length },
            ].map((filter) => (
              <button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeFilter === filter.id
                    ? "bg-blue-600 text-white"
                    : "bg-white text-gray-600 hover:bg-gray-50 border border-gray-300"
                }`}
              >
                {filter.label} ({filter.count})
              </button>
            ))}
          </div>
        </div>

        {/* Issues Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredIssues.map((issue) => (
            <Card key={issue.id} className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-6">
                <div className="space-y-4">
                  {/* Header */}
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <span className="text-xs font-mono text-blue-600 bg-blue-50 px-2 py-1 rounded">
                          {issue.id}
                        </span>
                        <span className={`text-xs px-2 py-1 rounded-full font-medium ${getPriorityColor(issue.priority)}`}>
                          {issue.priority.toUpperCase()}
                        </span>
                      </div>
                      <h3 className="font-bold text-gray-900 text-lg mb-2">{issue.title}</h3>
                      <p className="text-gray-600 text-sm leading-relaxed">{issue.description}</p>
                    </div>
                  </div>

                  {/* Status and Category */}
                  <div className="flex items-center space-x-3">
                    <span
                      className={`inline-flex items-center space-x-1 px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(issue.status)}`}
                    >
                      {getStatusIcon(issue.status)}
                      <span className="capitalize">{issue.status.replace("-", " ")}</span>
                    </span>
                    <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                      {issue.category}
                    </span>
                  </div>

                  {/* Location and Date */}
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center space-x-1">
                      <MapPin className="w-4 h-4" />
                      <span>{issue.location}</span>
                    </div>
                    <span>{new Date(issue.date).toLocaleDateString()}</span>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleUpvote(issue.id)}
                      className="border-blue-300 text-blue-600 hover:bg-blue-50 bg-transparent"
                    >
                      <ThumbsUp className="w-4 h-4 mr-2" />
                      Upvote ({issue.upvotes})
                    </Button>
                    <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white">
                      View Details
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {filteredIssues.length === 0 && (
          <div className="text-center py-12">
            <TrendingUp className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No issues found</h3>
            <p className="text-gray-600">Try adjusting your search or filter criteria.</p>
          </div>
        )}
      </div>
    </div>
  )
}