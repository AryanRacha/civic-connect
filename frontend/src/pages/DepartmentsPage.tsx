import React, { useState } from "react";
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
  Plus,
  Edit,
  Eye,
  UserPlus,
  Settings,
} from "lucide-react";

export default function DepartmentsPage() {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState<any>(null);
  const [showModal, setShowModal] = useState(false);

  const departments = [
    {
      id: "DEPT-001",
      name: "Public Works",
      head: "John Smith",
      email: "john.smith@city.gov",
      phone: "+1-555-0101",
      activeIssues: 24,
      resolvedThisMonth: 186,
      avgResolutionTime: "3.2 days",
      performance: 94,
      staff: [
        { name: "Mike Johnson", role: "Field Officer", status: "active" },
        { name: "Sarah Wilson", role: "Supervisor", status: "active" },
        { name: "Tom Brown", role: "Field Officer", status: "on-leave" },
      ],
      description:
        "Responsible for infrastructure maintenance, road repairs, and public facilities.",
    },
    {
      id: "DEPT-002",
      name: "Traffic Management",
      head: "Sarah Johnson",
      email: "sarah.johnson@city.gov",
      phone: "+1-555-0102",
      activeIssues: 12,
      resolvedThisMonth: 89,
      avgResolutionTime: "2.8 days",
      performance: 91,
      staff: [
        { name: "Emma Davis", role: "Field Officer", status: "active" },
        { name: "Alex Kumar", role: "Supervisor", status: "active" },
      ],
      description:
        "Manages traffic signals, road signs, and traffic flow optimization.",
    },
    {
      id: "DEPT-003",
      name: "Waste Management",
      head: "Mike Brown",
      email: "mike.brown@city.gov",
      phone: "+1-555-0103",
      activeIssues: 18,
      resolvedThisMonth: 145,
      avgResolutionTime: "4.1 days",
      performance: 87,
      staff: [
        { name: "Lisa Chen", role: "Field Officer", status: "active" },
        { name: "Robert Smith", role: "Supervisor", status: "active" },
        { name: "Jane Doe", role: "Field Officer", status: "active" },
      ],
      description:
        "Handles garbage collection, recycling programs, and waste disposal.",
    },
    {
      id: "DEPT-004",
      name: "Water & Sanitation",
      head: "Lisa Davis",
      email: "lisa.davis@city.gov",
      phone: "+1-555-0104",
      activeIssues: 8,
      resolvedThisMonth: 67,
      avgResolutionTime: "5.3 days",
      performance: 82,
      staff: [
        { name: "David Lee", role: "Field Officer", status: "active" },
        { name: "Maria Garcia", role: "Supervisor", status: "active" },
      ],
      description:
        "Manages water supply, sewage systems, and sanitation services.",
    },
  ];

  const filteredDepartments = departments.filter(
    (dept) =>
      dept.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      dept.head.toLowerCase().includes(searchTerm.toLowerCase()) ||
      dept.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleViewDepartment = (department: any) => {
    setSelectedDepartment(department);
    setShowModal(true);
  };

  const handleEditDepartment = (department: any) => {
    alert(
      `Edit department: ${department.name}\nThis would open an edit form in a real application.`
    );
  };

  const getPerformanceColor = (performance: number) => {
    if (performance >= 90) return "text-green-600 bg-green-50 border-green-200";
    if (performance >= 80)
      return "text-yellow-600 bg-yellow-50 border-yellow-200";
    return "text-red-600 bg-red-50 border-red-200";
  };

  const getStaffStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "text-green-600 bg-green-50 border-green-200";
      case "on-leave":
        return "text-yellow-600 bg-yellow-50 border-yellow-200";
      case "inactive":
        return "text-gray-600 bg-gray-50 border-gray-200";
      default:
        return "text-gray-600 bg-gray-50 border-gray-200";
    }
  };

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
              className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 w-full text-left"
            >
              <FileText className="h-5 w-5" /> Issues
            </button>
            <button
              onClick={() => {
                navigate("/admin-departments");
                setSidebarOpen(false);
              }}
              className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-gray-900 bg-gray-100 w-full text-left"
            >
              <Users className="h-5 w-5 text-blue-600" /> Departments
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
                placeholder="Search departments..."
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
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900 mb-2">
                    Departments
                  </h1>
                  <p className="text-gray-600">
                    Manage departments and their performance
                  </p>
                </div>
                <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-medium">
                  <Plus className="h-4 w-4" />
                  Add Department
                </button>
              </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <div className="bg-white p-4 rounded-lg border border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Total Departments</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {departments.length}
                    </p>
                  </div>
                  <Users className="h-8 w-8 text-blue-600" />
                </div>
              </div>
              <div className="bg-white p-4 rounded-lg border border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Active Issues</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {departments.reduce(
                        (sum, dept) => sum + dept.activeIssues,
                        0
                      )}
                    </p>
                  </div>
                  <AlertTriangle className="h-8 w-8 text-yellow-600" />
                </div>
              </div>
              <div className="bg-white p-4 rounded-lg border border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Resolved This Month</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {departments.reduce(
                        (sum, dept) => sum + dept.resolvedThisMonth,
                        0
                      )}
                    </p>
                  </div>
                  <CheckCircle className="h-8 w-8 text-green-600" />
                </div>
              </div>
              <div className="bg-white p-4 rounded-lg border border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Avg Performance</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {Math.round(
                        departments.reduce(
                          (sum, dept) => sum + dept.performance,
                          0
                        ) / departments.length
                      )}
                      %
                    </p>
                  </div>
                  <BarChart3 className="h-8 w-8 text-purple-600" />
                </div>
              </div>
            </div>

            {/* Departments List - Desktop Table View */}
            <div className="hidden lg:block bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Department
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Head
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Active Issues
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Performance
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Staff
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredDepartments.map((dept) => (
                      <tr key={dept.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4">
                          <div className="flex items-start gap-3">
                            <div className="flex-shrink-0">
                              <Users className="h-5 w-5 text-gray-400" />
                            </div>
                            <div className="min-w-0 flex-1">
                              <div className="text-sm font-medium text-gray-900">
                                {dept.name}
                              </div>
                              <div className="text-xs text-gray-500 mt-1">
                                {dept.id}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {dept.head}
                          </div>
                          <div className="text-xs text-gray-500">
                            {dept.email}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {dept.activeIssues}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
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
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {dept.staff.length} members
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => handleViewDepartment(dept)}
                              className="text-blue-600 hover:text-blue-900 p-1 rounded hover:bg-blue-50"
                              title="View Details"
                            >
                              <Eye className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() => handleEditDepartment(dept)}
                              className="text-gray-600 hover:text-gray-900 p-1 rounded hover:bg-gray-50"
                              title="Edit Department"
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
              {filteredDepartments.map((dept) => (
                <div
                  key={dept.id}
                  className="bg-white rounded-xl shadow-sm border border-gray-200 p-4"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-medium text-gray-900">
                        {dept.name}
                      </h3>
                      <p className="text-xs text-gray-500 mt-1">{dept.id}</p>
                    </div>
                    <div className="flex items-center gap-2 ml-2">
                      <span
                        className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getPerformanceColor(
                          dept.performance
                        )}`}
                      >
                        {dept.performance}%
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-xs text-gray-500 mb-3">
                    <div>
                      <span className="font-medium">Head:</span> {dept.head}
                    </div>
                    <div>
                      <span className="font-medium">Active Issues:</span>{" "}
                      {dept.activeIssues}
                    </div>
                    <div>
                      <span className="font-medium">Staff:</span>{" "}
                      {dept.staff.length} members
                    </div>
                    <div>
                      <span className="font-medium">Resolved:</span>{" "}
                      {dept.resolvedThisMonth}
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500">{dept.email}</span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleViewDepartment(dept)}
                        className="text-blue-600 hover:text-blue-900 p-1 rounded hover:bg-blue-50"
                        title="View Details"
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleEditDepartment(dept)}
                        className="text-gray-600 hover:text-gray-900 p-1 rounded hover:bg-gray-50"
                        title="Edit Department"
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

      {/* Department Details Modal */}
      {showModal && selectedDepartment && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  Department Details
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

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-500">
                      Department Name
                    </label>
                    <p className="text-sm text-gray-900">
                      {selectedDepartment.name}
                    </p>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-500">
                      Department ID
                    </label>
                    <p className="text-sm text-gray-900">
                      {selectedDepartment.id}
                    </p>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-500">
                      Description
                    </label>
                    <p className="text-sm text-gray-900">
                      {selectedDepartment.description}
                    </p>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-500">
                      Department Head
                    </label>
                    <p className="text-sm text-gray-900">
                      {selectedDepartment.head}
                    </p>
                    <p className="text-xs text-gray-500">
                      {selectedDepartment.email}
                    </p>
                    <p className="text-xs text-gray-500">
                      {selectedDepartment.phone}
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-500">
                      Performance Metrics
                    </label>
                    <div className="mt-2 space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Performance Score</span>
                        <span className="font-medium">
                          {selectedDepartment.performance}%
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Active Issues</span>
                        <span className="font-medium">
                          {selectedDepartment.activeIssues}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Resolved This Month</span>
                        <span className="font-medium">
                          {selectedDepartment.resolvedThisMonth}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Avg Resolution Time</span>
                        <span className="font-medium">
                          {selectedDepartment.avgResolutionTime}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-500">
                      Staff Members
                    </label>
                    <div className="mt-2 space-y-2">
                      {selectedDepartment.staff.map(
                        (member: any, index: number) => (
                          <div
                            key={index}
                            className="flex items-center justify-between p-2 bg-gray-50 rounded"
                          >
                            <div>
                              <p className="text-sm font-medium text-gray-900">
                                {member.name}
                              </p>
                              <p className="text-xs text-gray-500">
                                {member.role}
                              </p>
                            </div>
                            <span
                              className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getStaffStatusColor(
                                member.status
                              )}`}
                            >
                              {member.status.replace("-", " ").toUpperCase()}
                            </span>
                          </div>
                        )
                      )}
                    </div>
                  </div>
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
                    handleEditDepartment(selectedDepartment);
                  }}
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700"
                >
                  Edit Department
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
