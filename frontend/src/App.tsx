import { Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import LandingPage from "./pages/LandingPage";
import SignupPage from "./pages/SignupPage";
import DashboardPage from "./pages/DashboardPage";
import LoginPage from "./pages/LoginPage";
import ReportIssuePage from "./pages/ReportIssuePage";
import BrowseIssuesPage from "./pages/BrowseIssuesPage";
import MyProfilePage from "./pages/MyProfilePage";
import UnauthorizedPage from "./pages/UnauthorizedPage";
import AdminDashboardPage from "./pages/AdminDashboardPage";
import IssuesPage from "./pages/IssuesPage";
import DepartmentsPage from "./pages/DepartmentsPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <DashboardPage />
          </ProtectedRoute>
        }
      />
      <Route path="/admin-dashboard" element={<AdminDashboardPage />} />
      <Route path="/admin-issues" element={<IssuesPage />} />
      <Route path="/admin-departments" element={<DepartmentsPage />} />
      <Route
        path="/report-issue"
        element={
          <ProtectedRoute>
            <ReportIssuePage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/browse-issues"
        element={
          <ProtectedRoute>
            <BrowseIssuesPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/my-profile"
        element={
          <ProtectedRoute>
            <MyProfilePage />
          </ProtectedRoute>
        }
      />
      <Route path="/unauthorized" element={<UnauthorizedPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
