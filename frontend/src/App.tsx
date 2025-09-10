"use client"

import React, { useState } from "react"
import LandingPage from "./pages/LandingPage"
import SignupPage from "./pages/SignupPage"
import DashboardPage from "./pages/DashboardPage"
import LoginPage from "./pages/LoginPage"
import ReportIssuePage from "./pages/ReportIssuePage"
import BrowseIssuesPage from "./pages/BrowseIssuesPage"
import MyProfilePage from "./pages/MyProfilePage"

function App() {
  const [currentPage, setCurrentPage] = useState<
    "landing" | "signup" | "dashboard" | "login" | "report-issue" | "browse-issues" | "my-profile"
  >("landing")

  const navigateToSignup = () => setCurrentPage("signup")
  const navigateToLanding = () => setCurrentPage("landing")
  const navigateToDashboard = () => setCurrentPage("dashboard")
  const navigateToLogin = () => setCurrentPage("login")
  const navigateToReportIssue = () => setCurrentPage("report-issue")
  const navigateToBrowseIssues = () => setCurrentPage("browse-issues")
  const navigateToMyProfile = () => setCurrentPage("my-profile")

  return (
    <div>
      {currentPage === "landing" && (
        <LandingPage onNavigateToLogin={navigateToLogin} onNavigateToSignup={navigateToSignup} />
      )}
      {currentPage === "signup" && <SignupPage onNavigateToLogin={navigateToLogin} />}
      {currentPage === "dashboard" && (
        <DashboardPage
          onNavigateToLanding={navigateToLanding}
          onNavigateToReportIssue={navigateToReportIssue}
          onNavigateToBrowseIssues={navigateToBrowseIssues}
          onNavigateToMyProfile={navigateToMyProfile}
        />
      )}
      {currentPage === "login" && (
        <LoginPage
          onNavigateToSignup={navigateToSignup}
          onNavigateToDashboard={navigateToDashboard}
          onNavigateToLogin={navigateToLogin}
        />
      )}
      {currentPage === "report-issue" && <ReportIssuePage onNavigateBack={navigateToDashboard} />}
      {currentPage === "browse-issues" && <BrowseIssuesPage onNavigateBack={navigateToDashboard} />}
      {/* MyProfilePage now receives all relevant navigation props */}
      {currentPage === "my-profile" && (
        <MyProfilePage
          onNavigateBack={navigateToDashboard}
          onNavigateToReportIssue={navigateToReportIssue}
          onNavigateToBrowseIssues={navigateToBrowseIssues}
          onNavigateToLanding={navigateToLanding}
        />
      )}
    </div>
  )
}

export default App