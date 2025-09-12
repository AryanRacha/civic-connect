import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FileText,
  CheckCircle,
  Clock,
  AlertTriangle,
  MapPin,
  Users,
  BarChart3,
  Menu,
  Search,
  Bell,
  Filter,
  SortAsc,
  Eye,
  Edit,
} from "lucide-react";

export default function IssuesPage() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [sortBy, setSortBy] = useState("priority");
  const [selectedIssue, setSelectedIssue] = useState<any>(null);
  const [showModal, setShowModal] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const issues = [
    {
      id: "ISS-001",
      title: "Pothole on Main Street",
      description: "Large pothole causing traffic issues near the intersection",
      priority: "high",
      status: "open",
      department: "Public Works",
      reporter: "John Doe",
      location: "Main Street, Sector 5",
      createdAt: "2024-01-15",
      assignedTo: "Mike Johnson",
      upvotes: 12,
    },
    {
      id: "ISS-002",
      title: "Broken Street Light",
      description: "Street light not working for past 3 days",
      priority: "medium",
      status: "in-progress",
      department: "Electrical",
      reporter: "Sarah Wilson",
      location: "Park Avenue, Block A",
      createdAt: "2024-01-14",
      assignedTo: "Tom Brown",
      upvotes: 8,
    },
    {
      id: "ISS-003",
      title: "Garbage Collection Delay",
      description: "Garbage not collected for 2 days in residential area",
      priority: "medium",
      status: "open",
      department: "Waste Management",
      reporter: "David Lee",
      location: "Green Park Colony",
      createdAt: "2024-01-13",
      assignedTo: "Unassigned",
      upvotes: 15,
    },
    {
      id: "ISS-004",
      title: "Water Leakage",
      description: "Water leaking from main pipeline",
      priority: "high",
      status: "resolved",
      department: "Water & Sanitation",
      reporter: "Lisa Chen",
      location: "Central Market Area",
      createdAt: "2024-01-12",
      assignedTo: "Alex Kumar",
      upvotes: 6,
    },
    {
      id: "ISS-005",
      title: "Traffic Signal Malfunction",
      description: "Traffic signal not working properly at busy intersection",
      priority: "high",
      status: "in-progress",
      department: "Traffic Management",
      reporter: "Robert Smith",
      location: "City Center Junction",
      createdAt: "2024-01-11",
      assignedTo: "Emma Davis",
      upvotes: 20,
    },
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "text-red-600 bg-red-50 border-red-200";
      case "medium":
        return "text-yellow-600 bg-yellow-50 border-yellow-200";
      case "low":
        return "text-green-600 bg-green-50 border-green-200";
      default:
        return "text-gray-600 bg-gray-50 border-gray-200";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "open":
        return "text-blue-600 bg-blue-50 border-blue-200";
      case "in-progress":
        return "text-yellow-600 bg-yellow-50 border-yellow-200";
      case "resolved":
        return "text-green-600 bg-green-50 border-green-200";
      case "closed":
        return "text-gray-600 bg-gray-50 border-gray-200";
      default:
        return "text-gray-600 bg-gray-50 border-gray-200";
    }
  };

  const handleViewIssue = (issue: any) => {
    setSelectedIssue(issue);
    setShowModal(true);
  };

  const handleEditIssue = (issue: any) => {
    // For now, just show an alert. In a real app, this would navigate to edit page
    alert(
      `Edit issue: ${issue.title}\nThis would open an edit form in a real application.`
    );
  };

  const getPriorityValue = (priority: string) => {
    switch (priority) {
      case "high":
        return 3;
      case "medium":
        return 2;
      case "low":
        return 1;
      default:
        return 0;
    }
  };

  const filteredAndSortedIssues = issues
    .filter((issue) => {
      const matchesSearch =
        issue.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        issue.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        issue.id.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesFilter =
        filterStatus === "all" || issue.status === filterStatus;
      return matchesSearch && matchesFilter;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "priority":
          return getPriorityValue(b.priority) - getPriorityValue(a.priority);
        case "date":
          return (
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );
        case "upvotes":
          return b.upvotes - a.upvotes;
        default:
          return 0;
      }
    });

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex min-h-screen">
        {/* Mobile sidebar overlay */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Sidebar */}
        <aside
          className={`fixed inset-y-0 left-0 z-50 w-64 xl:w-72 bg-white border-r border-gray-200 transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="h-16 px-6 flex items-center border-b border-gray-200">
            <span className="text-lg font-semibold text-gray-900">
              Admin Panel
            </span>
          </div>
          <nav className="flex-1 p-4 space-y-1">
            <button
              onClick={() => {
                navigate("/admin-dashboard");
                setSidebarOpen(false);
              }}
              className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 w-full text-left"
            >
              <BarChart3 className="h-5 w-5" /> Overview
            </button>
            <button
              onClick={() => {
                navigate("/admin-issues");
                setSidebarOpen(false);
              }}
              className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-gray-900 bg-gray-100 w-full text-left"
            >
              <FileText className="h-5 w-5 text-blue-600" /> Issues
            </button>
            <button
              onClick={() => {
                navigate("/admin-departments");
                setSidebarOpen(false);
              }}
              className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 w-full text-left"
            >
              <Users className="h-5 w-5" /> Departments
            </button>
          </nav>
          <div className="p-4 border-t border-gray-200 text-xs text-gray-500">
            v1.0 Preview
          </div>
        </aside>

        {/* Main column */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Topbar */}
          <header className="h-16 px-4 sm:px-6 flex items-center gap-3 border-b border-gray-200 bg-white">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 rounded-md border border-gray-200 text-gray-600 hover:bg-gray-50"
            >
              <Menu className="h-5 w-5" />
            </button>
            <div className="relative flex-1 max-w-xl">
              <Search className="h-4 w-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search issues..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              />
            </div>
            <button className="p-2 rounded-md hover:bg-gray-100 text-gray-600">
              <Bell className="h-5 w-5" />
            </button>
            <div className="h-8 w-px bg-gray-200" />
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm font-semibold">
                A
              </div>
              <div className="hidden sm:block">
                <div className="text-sm font-medium text-gray-900">
                  Admin User
                </div>
                <div className="text-xs text-gray-500">Municipal Admin</div>
              </div>
            </div>
          </header>

          {/* Content */}
          <main className="flex-1 p-4 sm:p-6">
            <div className="mb-6">
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                Issues Queue
              </h1>
              <p className="text-gray-600">
                Manage and track all reported issues
              </p>
            </div>

            {/* Filters and Stats */}
            <div className="mb-6 space-y-4">
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 flex-1 sm:flex-none"
                >
                  <option value="all">All Status</option>
                  <option value="open">Open</option>
                  <option value="in-progress">In Progress</option>
                  <option value="resolved">Resolved</option>
                  <option value="closed">Closed</option>
                </select>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 flex-1 sm:flex-none"
                >
                  <option value="priority">Sort by Priority</option>
                  <option value="date">Sort by Date</option>
                  <option value="upvotes">Sort by Upvotes</option>
                </select>
              </div>
              <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                <span>Total: {filteredAndSortedIssues.length}</span>
                <span>
                  Open:{" "}
                  {
                    filteredAndSortedIssues.filter((i) => i.status === "open")
                      .length
                  }
                </span>
                <span>
                  In Progress:{" "}
                  {
                    filteredAndSortedIssues.filter(
                      (i) => i.status === "in-progress"
                    ).length
                  }
                </span>
              </div>
            </div>

            {/* Issues List - Desktop Table View */}
            <div className="hidden lg:block bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Issue
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Priority
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Department
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Assigned To
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Upvotes
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredAndSortedIssues.map((issue) => (
                      <tr key={issue.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4">
                          <div className="flex items-start gap-3">
                            <div className="flex-shrink-0">
                              <FileText className="h-5 w-5 text-gray-400" />
                            </div>
                            <div className="min-w-0 flex-1">
                              <div className="text-sm font-medium text-gray-900">
                                {issue.title}
                              </div>
                              <div className="text-xs text-gray-500 mt-1">
                                {issue.id}
                              </div>
                              <div className="text-xs text-gray-500 mt-1 flex items-center gap-1">
                                <MapPin className="h-3 w-3" />
                                {issue.location}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getPriorityColor(
                              issue.priority
                            )}`}
                          >
                            {issue.priority.toUpperCase()}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(
                              issue.status
                            )}`}
                          >
                            {issue.status.replace("-", " ").toUpperCase()}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {issue.department}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {issue.assignedTo}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          <div className="flex items-center gap-1">
                            <span className="text-yellow-500">↑</span>
                            {issue.upvotes}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => handleViewIssue(issue)}
                              className="text-blue-600 hover:text-blue-900 p-1 rounded hover:bg-blue-50"
                              title="View Details"
                            >
                              <Eye className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() => handleEditIssue(issue)}
                              className="text-gray-600 hover:text-gray-900 p-1 rounded hover:bg-gray-50"
                              title="Edit Issue"
                            >
                              <Edit className="h-4 w-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Mobile Card View */}
            <div className="lg:hidden space-y-4">
              {filteredAndSortedIssues.map((issue) => (
                <div
                  key={issue.id}
                  className="bg-white rounded-xl shadow-sm border border-gray-200 p-4"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-medium text-gray-900 truncate">
                        {issue.title}
                      </h3>
                      <p className="text-xs text-gray-500 mt-1">{issue.id}</p>
                    </div>
                    <div className="flex items-center gap-2 ml-2">
                      <span
                        className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getPriorityColor(
                          issue.priority
                        )}`}
                      >
                        {issue.priority.toUpperCase()}
                      </span>
                      <span
                        className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(
                          issue.status
                        )}`}
                      >
                        {issue.status.replace("-", " ").toUpperCase()}
                      </span>
                    </div>
                  </div>

                  <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                    {issue.description}
                  </p>

                  <div className="grid grid-cols-2 gap-3 text-xs text-gray-500 mb-3">
                    <div className="flex items-center gap-1">
                      <Users className="h-3 w-3" />
                      <span>{issue.department}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="text-yellow-500">↑</span>
                      <span>{issue.upvotes} votes</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      <span className="truncate">{issue.location}</span>
                    </div>
                    <div>
                      <span>Assigned: {issue.assignedTo}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500">
                      Created: {issue.createdAt}
                    </span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleViewIssue(issue)}
                        className="text-blue-600 hover:text-blue-900 p-1 rounded hover:bg-blue-50"
                        title="View Details"
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleEditIssue(issue)}
                        className="text-gray-600 hover:text-gray-900 p-1 rounded hover:bg-gray-50"
                        title="Edit Issue"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </main>

          {/* Footer */}
          <footer className="h-14 px-6 border-t border-gray-200 bg-white flex items-center justify-between text-sm text-gray-600">
            <span>© 2025 CivicConnect Admin Preview</span>
            <span className="hidden sm:inline">
              Built for Smart India Hackathon
            </span>
          </footer>
        </div>
      </div>

      {/* Issue Details Modal */}
      {showModal && selectedIssue && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  Issue Details
                </h3>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-500">
                    Issue ID
                  </label>
                  <p className="text-sm text-gray-900">{selectedIssue.id}</p>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-500">
                    Title
                  </label>
                  <p className="text-sm text-gray-900">{selectedIssue.title}</p>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-500">
                    Description
                  </label>
                  <p className="text-sm text-gray-900">
                    {selectedIssue.description}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-500">
                      Priority
                    </label>
                    <div className="mt-1">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getPriorityColor(
                          selectedIssue.priority
                        )}`}
                      >
                        {selectedIssue.priority.toUpperCase()}
                      </span>
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-500">
                      Status
                    </label>
                    <div className="mt-1">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(
                          selectedIssue.status
                        )}`}
                      >
                        {selectedIssue.status.replace("-", " ").toUpperCase()}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-500">
                      Department
                    </label>
                    <p className="text-sm text-gray-900">
                      {selectedIssue.department}
                    </p>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-500">
                      Assigned To
                    </label>
                    <p className="text-sm text-gray-900">
                      {selectedIssue.assignedTo}
                    </p>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-500">
                    Location
                  </label>
                  <p className="text-sm text-gray-900 flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    {selectedIssue.location}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-500">
                      Reporter
                    </label>
                    <p className="text-sm text-gray-900">
                      {selectedIssue.reporter}
                    </p>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-500">
                      Created
                    </label>
                    <p className="text-sm text-gray-900">
                      {selectedIssue.createdAt}
                    </p>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-500">
                    Community Upvotes
                  </label>
                  <p className="text-sm text-gray-900 flex items-center gap-1">
                    <span className="text-yellow-500">↑</span>
                    {selectedIssue.upvotes} votes
                  </p>
                </div>
              </div>

              <div className="mt-6 flex justify-end gap-3">
                <button
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    setShowModal(false);
                    handleEditIssue(selectedIssue);
                  }}
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700"
                >
                  Edit Issue
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
