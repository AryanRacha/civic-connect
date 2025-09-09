"use client"

import { useState } from "react"
import LandingPage from "./pages/LandingPage"
import SignupPage from "./pages/SignupPage"
import DashboardPage from "./pages/DashboardPage"
import LoginPage from "./pages/LoginPage"
import ReportIssuePage from "./pages/ReportIssuePage"

function App() {
  const [currentPage, setCurrentPage] = useState<"landing" | "signup" | "dashboard" | "login" | "report-issue">(
    "landing",
  )

  const navigateToSignup = () => setCurrentPage("signup")
  const navigateToLanding = () => setCurrentPage("landing")
  const navigateToDashboard = () => setCurrentPage("dashboard")
  const navigateToLogin = () => setCurrentPage("login")
  const navigateToReportIssue = () => setCurrentPage("report-issue")

  return (
    <div>
      {currentPage === "landing" && (
        <LandingPage
          onNavigateToSignup={navigateToSignup}
          onNavigateToDashboard={navigateToDashboard}
          onNavigateToLogin={navigateToLogin}
        />
      )}
      {currentPage === "signup" && (
        <SignupPage onNavigateToLanding={navigateToLanding} onNavigateToLogin={navigateToLogin} />
      )}
      {currentPage === "dashboard" && (
        <DashboardPage onNavigateToLanding={navigateToLanding} onNavigateToReportIssue={navigateToReportIssue} />
      )}
      {currentPage === "login" && (
        <LoginPage onNavigateToLanding={navigateToLanding} onNavigateToDashboard={navigateToDashboard} />
      )}
      {currentPage === "report-issue" && <ReportIssuePage onNavigateBack={navigateToDashboard} />}
    </div>
  )
}

export default App
