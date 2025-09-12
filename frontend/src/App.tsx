import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import LandingPage from "./pages/LandingPage";
import SignupPage from "./pages/SignupPage";
import DashboardPage from "./pages/DashboardPage";
import LoginPage from "./pages/LoginPage";
import ReportIssuePage from "./pages/ReportIssuePage";
import BrowseIssuesPage from "./pages/BrowseIssuesPage";
import MyProfilePage from "./pages/MyProfilePage";
import UnauthorizedPage from "./pages/UnauthorizedPage";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
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
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
