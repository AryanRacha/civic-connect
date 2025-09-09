"use client"

import { useState } from "react"
import LandingPage from "./pages/LandingPage"
import SignupPage from "./pages/SignupPage"
import DashboardPage from "./pages/DashboardPage"
import LoginPage from "./pages/LoginPage"

function App() {
  const [currentPage, setCurrentPage] = useState<"landing" | "signup" | "dashboard" | "login">("landing")

  const navigateToSignup = () => setCurrentPage("signup")
  const navigateToLanding = () => setCurrentPage("landing")
  const navigateToDashboard = () => setCurrentPage("dashboard")
  const navigateToLogin = () => setCurrentPage("login")

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
      {currentPage === "dashboard" && <DashboardPage onNavigateToLanding={navigateToLanding} />}
      {currentPage === "login" && (
        <LoginPage onNavigateToLanding={navigateToLanding} onNavigateToDashboard={navigateToDashboard} />
      )}
    </div>
  )
}

export default App
