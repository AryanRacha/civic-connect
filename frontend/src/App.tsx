import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import SignupPage from "./pages/SignupPage";
import DashboardPage from "./pages/DashboardPage";
import LoginPage from "./pages/LoginPage";
import ReportIssuePage from "./pages/ReportIssuePage";
import BrowseIssuesPage from "./pages/BrowseIssuesPage";
import MyProfilePage from "./pages/MyProfilePage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/report-issue" element={<ReportIssuePage />} />
        <Route path="/browse-issues" element={<BrowseIssuesPage />} />
        <Route path="/my-profile" element={<MyProfilePage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
