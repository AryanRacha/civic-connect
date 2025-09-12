import React from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import {
  FileText,
  CheckCircle,
  Clock,
  AlertTriangle,
  TrendingUp,
  MapPin,
  Users,
  BarChart3,
  Menu,
  Search,
  Bell,
} from "lucide-react";
import MetricCard from "../components/MetricCard";
import RecentActivity from "../components/RecentActivity";
// import IssueMap from "../components/IssueMap";
import MapComponent from "../components/MapComponent";

export default function Dashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = React.useState(false);
  const [searchTerm, setSearchTerm] = React.useState("");
  const [showSearchResults, setShowSearchResults] = React.useState(false);
  const isAdmin = true; // Preview mode: always show admin view

  const adminMetrics = [
    {
      title: "Total Issues Reported",
      value: "1,247",
      change: "+12%",
      trend: "up" as const,
      icon: FileText,
      color: "blue" as const,
    },
    {
      title: "Issues Resolved This Month",
      value: "186",
      change: "+8%",
      trend: "up" as const,
      icon: CheckCircle,
      color: "green" as const,
    },
    {
      title: "Average Resolution Time",
      value: "4.2 days",
      change: "-15%",
      trend: "up" as const,
      icon: Clock,
      color: "amber" as const,
    },
    {
      title: "Department Performance",
      value: "87%",
      change: "+3%",
      trend: "up" as const,
      icon: BarChart3,
      color: "purple" as const,
    },
  ];

  const officerMetrics = [
    {
      title: "Total Issues Assigned",
      value: "42",
      change: "+5",
      trend: "up" as const,
      icon: FileText,
      color: "blue" as const,
    },
    {
      title: "Issues in Progress",
      value: "18",
      change: "+2",
      trend: "up" as const,
      icon: Clock,
      color: "amber" as const,
    },
    {
      title: "Overdue Issues",
      value: "3",
      change: "-1",
      trend: "down" as const,
      icon: AlertTriangle,
      color: "red" as const,
    },
    {
      title: "Resolved This Week",
      value: "12",
      change: "+4",
      trend: "up" as const,
      icon: CheckCircle,
      color: "green" as const,
    },
  ];

  const metrics = isAdmin ? adminMetrics : officerMetrics;

  // Mock data for search functionality
  const mockIssues = [
    {
      id: "ISS-001",
      title: "Pothole on Main Street",
      department: "Public Works",
      status: "open",
    },
    {
      id: "ISS-002",
      title: "Broken Street Light",
      department: "Electrical",
      status: "in-progress",
    },
    {
      id: "ISS-003",
      title: "Garbage Collection Delay",
      department: "Waste Management",
      status: "open",
    },
    {
      id: "ISS-004",
      title: "Water Leakage",
      department: "Water & Sanitation",
      status: "resolved",
    },
    {
      id: "ISS-005",
      title: "Traffic Signal Malfunction",
      department: "Traffic Management",
      status: "in-progress",
    },
  ];

  const mockDepartments = [
    { name: "Public Works", head: "John Smith", activeIssues: 24 },
    { name: "Traffic Management", head: "Sarah Johnson", activeIssues: 12 },
    { name: "Waste Management", head: "Mike Brown", activeIssues: 18 },
    { name: "Water & Sanitation", head: "Lisa Davis", activeIssues: 8 },
  ];

  const mockUsers = [
    { name: "John Doe", role: "Field Officer", department: "Public Works" },
    {
      name: "Jane Smith",
      role: "Supervisor",
      department: "Traffic Management",
    },
    {
      name: "Bob Wilson",
      role: "Field Officer",
      department: "Waste Management",
    },
  ];

  const searchResults = React.useMemo(() => {
    if (!searchTerm.trim()) return { issues: [], departments: [], users: [] };

    const term = searchTerm.toLowerCase();
    return {
      issues: mockIssues.filter(
        (issue) =>
          issue.title.toLowerCase().includes(term) ||
          issue.id.toLowerCase().includes(term) ||
          issue.department.toLowerCase().includes(term)
      ),
      departments: mockDepartments.filter(
        (dept) =>
          dept.name.toLowerCase().includes(term) ||
          dept.head.toLowerCase().includes(term)
      ),
      users: mockUsers.filter(
        (user) =>
          user.name.toLowerCase().includes(term) ||
          user.role.toLowerCase().includes(term) ||
          user.department.toLowerCase().includes(term)
      ),
    };
  }, [searchTerm]);

  // Close search results when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (!target.closest(".search-container")) {
        setShowSearchResults(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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
              className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-gray-900 bg-gray-100 w-full text-left"
            >
              <BarChart3 className="h-5 w-5 text-blue-600" /> Overview
            </button>
            <button
              onClick={() => {
                navigate("/admin-issues");
                setSidebarOpen(false);
              }}
              className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 w-full text-left"
            >
              <FileText className="h-5 w-5" /> Issues
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
            <div className="relative flex-1 max-w-xl search-container">
              <Search className="h-4 w-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search issues, departments, users..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setShowSearchResults(true);
                }}
                onFocus={() => setShowSearchResults(true)}
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              />
              {/* Search Results Dropdown */}
              {showSearchResults &&
                searchTerm &&
                (searchResults.issues.length > 0 ||
                  searchResults.departments.length > 0 ||
                  searchResults.users.length > 0) && (
                  <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-96 overflow-y-auto">
                    <div className="p-2">
                      {searchResults.issues.length > 0 && (
                        <div className="mb-3">
                          <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                            Issues
                          </h4>
                          {searchResults.issues.map((issue) => (
                            <div
                              key={issue.id}
                              className="p-2 hover:bg-gray-50 rounded cursor-pointer"
                            >
                              <div className="text-sm font-medium text-gray-900">
                                {issue.title}
                              </div>
                              <div className="text-xs text-gray-500">
                                {issue.id} • {issue.department}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}

                      {searchResults.departments.length > 0 && (
                        <div className="mb-3">
                          <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                            Departments
                          </h4>
                          {searchResults.departments.map((dept, index) => (
                            <div
                              key={index}
                              className="p-2 hover:bg-gray-50 rounded cursor-pointer"
                            >
                              <div className="text-sm font-medium text-gray-900">
                                {dept.name}
                              </div>
                              <div className="text-xs text-gray-500">
                                Head: {dept.head} • {dept.activeIssues} active
                                issues
                              </div>
                            </div>
                          ))}
                        </div>
                      )}

                      {searchResults.users.length > 0 && (
                        <div>
                          <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                            Users
                          </h4>
                          {searchResults.users.map((user, index) => (
                            <div
                              key={index}
                              className="p-2 hover:bg-gray-50 rounded cursor-pointer"
                            >
                              <div className="text-sm font-medium text-gray-900">
                                {user.name}
                              </div>
                              <div className="text-xs text-gray-500">
                                {user.role} • {user.department}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                )}
            </div>
            <button className="p-2 rounded-md hover:bg-gray-100 text-gray-600">
              <Bell className="h-5 w-5" />
            </button>
            <div className="h-8 w-px bg-gray-200" />
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm font-semibold">
                {user?.name?.[0]?.toUpperCase() || "A"}
              </div>
              <div className="hidden sm:block">
                <div className="text-sm font-medium text-gray-900">
                  {user?.name || "Admin User"}
                </div>
                <div className="text-xs text-gray-500">Municipal Admin</div>
              </div>
            </div>
          </header>

          {/* Content */}
          <main className="flex-1 p-4 sm:p-6 space-y-8">
            {/* Metrics Grid */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {metrics.map((metric, index) => (
                <MetricCard key={index} {...metric} />
              ))}
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Issue Map */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center gap-3 mb-6">
                  <MapPin className="h-6 w-6 text-blue-600" />
                  <h3 className="text-lg font-semibold text-gray-900">
                    {isAdmin ? "Issue Distribution" : "My Jurisdiction"}
                  </h3>
                </div>
                <div className="rounded-lg overflow-hidden h-64 border border-blue-200">
                  <MapComponent />
                </div>
              </div>

              {/* Recent Activity */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center gap-3 mb-6">
                  <TrendingUp className="h-6 w-6 text-green-600" />
                  <h3 className="text-lg font-semibold text-gray-900">
                    Recent Activity
                  </h3>
                </div>
                <RecentActivity />
              </div>
            </div>

            {isAdmin && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <Users className="h-6 w-6 text-purple-600" />
                    <h3 className="text-lg font-semibold text-gray-900">
                      Department Performance
                    </h3>
                  </div>
                  <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                    View Details
                  </button>
                </div>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Department
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Active Issues
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Resolved
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Avg Resolution Time
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Performance
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {[
                        {
                          name: "Public Works",
                          active: 24,
                          resolved: 186,
                          avgTime: "3.2 days",
                          performance: 94,
                        },
                        {
                          name: "Traffic Management",
                          active: 12,
                          resolved: 89,
                          avgTime: "2.8 days",
                          performance: 91,
                        },
                        {
                          name: "Waste Management",
                          active: 18,
                          resolved: 145,
                          avgTime: "4.1 days",
                          performance: 87,
                        },
                        {
                          name: "Water & Sanitation",
                          active: 8,
                          resolved: 67,
                          avgTime: "5.3 days",
                          performance: 82,
                        },
                      ].map((dept) => (
                        <tr key={dept.name} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {dept.name}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {dept.active}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {dept.resolved}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {dept.avgTime}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            <div className="flex items-center gap-2">
                              <div className="flex-1 bg-gray-200 rounded-full h-2">
                                <div
                                  className="bg-green-500 h-2 rounded-full"
                                  style={{ width: `${dept.performance}%` }}
                                ></div>
                              </div>
                              <span className="text-sm font-medium">
                                {dept.performance}%
                              </span>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
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
    </div>
  );
}
