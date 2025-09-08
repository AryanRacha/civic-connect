import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"
import {
  Shield,
  Bot,
  ThumbsUp,
  Smartphone,
  BarChart3,
  Bell,
  CheckCircle,
  Menu,
  ArrowRight,
  MessageCircle,
  Users,
} from "lucide-react"

export default function GrievanceLandingPage() {
  return (
    <div className="min-h-screen bg-white">
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-teal-600 rounded-lg flex items-center justify-center">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">CivicConnect</span>
            </div>

            <div className="hidden md:flex items-center space-x-8">
              <a href="#platform" className="text-gray-600 hover:text-blue-600 transition-colors">
                Platform
              </a>
              <a href="#features" className="text-gray-600 hover:text-blue-600 transition-colors">
                Features
              </a>
              <a href="#how-it-works" className="text-gray-600 hover:text-blue-600 transition-colors">
                How It Works
              </a>
              <a href="#contact" className="text-gray-600 hover:text-blue-600 transition-colors">
                Contact
              </a>
              <Link href="/signup">
                <Button
                  size="sm"
                  variant="outline"
                  className="border-blue-600 text-blue-600 hover:bg-blue-50 bg-transparent"
                >
                  Sign Up
                </Button>
              </Link>
              <Link href="/signup">
                <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white">
                  Report Issue
                </Button>
              </Link>
            </div>

            <button className="md:hidden">
              <Menu className="w-6 h-6 text-gray-600" />
            </button>
          </div>
        </div>
      </nav>

      <section className="relative overflow-hidden bg-white">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-10 w-32 h-32 bg-blue-400 rounded-full blur-3xl"></div>
          <div className="absolute top-40 right-20 w-24 h-24 bg-teal-400 rounded-full blur-2xl"></div>
          <div className="absolute bottom-20 left-1/3 w-40 h-40 bg-cyan-400 rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto px-4 py-20 lg:py-32 relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-6">
                <h1 className="text-5xl lg:text-7xl font-bold text-gray-900 text-balance leading-tight">
                  Empowering Citizens, Building a Better Community
                </h1>
                <p className="text-xl lg:text-2xl text-gray-700 text-pretty leading-relaxed">
                  Your Voice. Your Community. Our Priority. A transparent and efficient platform for civic grievance
                  redressal.
                </p>
              </div>

              {/* Enhanced Problem Statement */}
              <Card className="border-l-4 border-l-orange-400 bg-gradient-to-r from-orange-50 to-red-50 shadow-lg border-orange-200">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-orange-400 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-white text-sm font-bold">!</span>
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 mb-2">
                        Problem: Fragmented civic systems lead to delays & citizen dissatisfaction
                      </h3>
                      <p className="text-gray-700 text-sm">
                        Current systems lack transparency, accountability, and efficient communication between citizens
                        and government.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/signup">
                  <Button
                    size="lg"
                    className="bg-blue-600 text-white hover:bg-blue-700 px-8 py-4 text-lg font-semibold"
                  >
                    Report an Issue
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-blue-600 text-blue-600 hover:bg-blue-50 px-8 py-4 text-lg bg-transparent"
                >
                  Learn More
                </Button>
              </div>
            </div>

            <div className="relative">
              <div className="bg-gradient-to-br from-blue-100 via-teal-100 to-cyan-100 rounded-3xl p-8 shadow-2xl border border-blue-200">
                <img
                  src="/citizen-reporting-issue-on-mobile-device-with-gove.jpg"
                  alt="Civic grievance system workflow illustration"
                  className="max-w-full h-auto rounded-2xl"
                  style={{ filter: "hue-rotate(200deg) saturate(1.3) brightness(1.1) contrast(1.2)" }}
                />
              </div>
              {/* Floating elements */}
              <div className="absolute -top-4 -right-4 w-16 h-16 bg-blue-600 rounded-full shadow-lg flex items-center justify-center">
                <MessageCircle className="w-8 h-8 text-white" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="how-it-works" className="bg-gradient-to-br from-gray-50 to-blue-50 py-20 lg:py-32">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-6 mb-20">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900">How It Works: A Unified Platform</h2>
            <p className="text-xl lg:text-2xl text-gray-600 max-w-4xl mx-auto text-pretty leading-relaxed">
              Our system streamlines the entire process, from a citizen's complaint to a verified resolution.
            </p>
          </div>

          {/* Enhanced Horizontal Sequential Diagram */}
          <div className="flex items-center justify-center max-w-6xl mx-auto">
            <div className="flex items-center space-x-8 md:space-x-16">
              {/* Step 1 */}
              <div className="flex flex-col items-center space-y-6 group">
                <div className="relative">
                  <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-blue-700 rounded-full flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform duration-300">
                    <Smartphone className="w-12 h-12 text-white" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-orange-400 rounded-full flex items-center justify-center text-white font-bold text-sm">
                    1
                  </div>
                </div>
                <div className="text-center max-w-xs">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Report & Track</h3>
                  <p className="text-gray-600 text-sm">Citizens submit issues with photos and location data</p>
                </div>
              </div>

              {/* Enhanced Arrow 1 */}
              <div className="flex items-center">
                <div className="flex flex-col items-center">
                  <ArrowRight className="w-10 h-10 text-blue-600" />
                  <div className="w-16 h-1 bg-gradient-to-r from-blue-600 to-teal-600 rounded-full mt-2"></div>
                </div>
              </div>

              {/* Step 2 */}
              <div className="flex flex-col items-center space-y-6 group">
                <div className="relative">
                  <div className="w-24 h-24 bg-gradient-to-br from-teal-500 to-teal-700 rounded-full flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform duration-300">
                    <BarChart3 className="w-12 h-12 text-white" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-orange-400 rounded-full flex items-center justify-center text-white font-bold text-sm">
                    2
                  </div>
                </div>
                <div className="text-center max-w-xs">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Manage & Assign</h3>
                  <p className="text-gray-600 text-sm">AI categorizes and assigns to relevant departments</p>
                </div>
              </div>

              {/* Enhanced Arrow 2 */}
              <div className="flex items-center">
                <div className="flex flex-col items-center">
                  <ArrowRight className="w-10 h-10 text-blue-600" />
                  <div className="w-16 h-1 bg-gradient-to-r from-teal-600 to-green-600 rounded-full mt-2"></div>
                </div>
              </div>

              {/* Step 3 */}
              <div className="flex flex-col items-center space-y-6 group">
                <div className="relative">
                  <div className="w-24 h-24 bg-gradient-to-br from-green-500 to-green-700 rounded-full flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform duration-300">
                    <CheckCircle className="w-12 h-12 text-white" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-orange-400 rounded-full flex items-center justify-center text-white font-bold text-sm">
                    3
                  </div>
                </div>
                <div className="text-center max-w-xs">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Resolve & Verify</h3>
                  <p className="text-gray-600 text-sm">Officials resolve issues with citizen verification</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="features" className="py-20 lg:py-32 overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-6 mb-20">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900">Features That Make a Difference</h2>
          </div>

          {/* Infinite Looping Slider */}
          <div className="relative">
            <div className="flex animate-scroll space-x-8">
              {/* First set of cards */}
              <Card className="flex-shrink-0 w-80 p-8 hover:shadow-xl transition-all duration-300 border-0 shadow-lg">
                <CardContent className="p-0 space-y-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl flex items-center justify-center">
                    <Shield className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">Secure SSO</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Aadhaar/DigiLocker verified authentication for trusted identity verification.
                  </p>
                </CardContent>
              </Card>

              <Card className="flex-shrink-0 w-80 p-8 hover:shadow-xl transition-all duration-300 border-0 shadow-lg">
                <CardContent className="p-0 space-y-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-green-100 to-green-200 rounded-xl flex items-center justify-center">
                    <Bot className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">AI-Powered Helpdesk</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Intelligent guidance and instant support for reporting issues.
                  </p>
                </CardContent>
              </Card>

              <Card className="flex-shrink-0 w-80 p-8 hover:shadow-xl transition-all duration-300 border-0 shadow-lg">
                <CardContent className="p-0 space-y-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-100 to-purple-200 rounded-xl flex items-center justify-center">
                    <ThumbsUp className="w-8 h-8 text-purple-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">Community Upvoting</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Prioritize the most pressing issues with community voice.
                  </p>
                </CardContent>
              </Card>

              <Card className="flex-shrink-0 w-80 p-8 hover:shadow-xl transition-all duration-300 border-0 shadow-lg">
                <CardContent className="p-0 space-y-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-orange-100 to-orange-200 rounded-xl flex items-center justify-center">
                    <Smartphone className="w-8 h-8 text-orange-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">Offline Capability</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Report and work without internet connection for remote areas.
                  </p>
                </CardContent>
              </Card>

              <Card className="flex-shrink-0 w-80 p-8 hover:shadow-xl transition-all duration-300 border-0 shadow-lg">
                <CardContent className="p-0 space-y-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-teal-100 to-teal-200 rounded-xl flex items-center justify-center">
                    <BarChart3 className="w-8 h-8 text-teal-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">Public Transparency</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Real-time dashboard showing government performance metrics.
                  </p>
                </CardContent>
              </Card>

              <Card className="flex-shrink-0 w-80 p-8 hover:shadow-xl transition-all duration-300 border-0 shadow-lg">
                <CardContent className="p-0 space-y-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-red-100 to-red-200 rounded-xl flex items-center justify-center">
                    <Bell className="w-8 h-8 text-red-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">Escalation Alerts</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Automatic alerts ensuring accountability and timely resolution.
                  </p>
                </CardContent>
              </Card>

              {/* Duplicate set for seamless loop */}
              <Card className="flex-shrink-0 w-80 p-8 hover:shadow-xl transition-all duration-300 border-0 shadow-lg">
                <CardContent className="p-0 space-y-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl flex items-center justify-center">
                    <Shield className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">Secure SSO</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Aadhaar/DigiLocker verified authentication for trusted identity verification.
                  </p>
                </CardContent>
              </Card>

              <Card className="flex-shrink-0 w-80 p-8 hover:shadow-xl transition-all duration-300 border-0 shadow-lg">
                <CardContent className="p-0 space-y-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-green-100 to-green-200 rounded-xl flex items-center justify-center">
                    <Bot className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">AI-Powered Helpdesk</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Intelligent guidance and instant support for reporting issues.
                  </p>
                </CardContent>
              </Card>

              <Card className="flex-shrink-0 w-80 p-8 hover:shadow-xl transition-all duration-300 border-0 shadow-lg">
                <CardContent className="p-0 space-y-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-100 to-purple-200 rounded-xl flex items-center justify-center">
                    <ThumbsUp className="w-8 h-8 text-purple-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">Community Upvoting</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Prioritize the most pressing issues with community voice.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-br from-blue-600 via-teal-600 to-green-600 py-20 lg:py-32 relative overflow-hidden">
        {/* Background elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-32 h-32 bg-white rounded-full blur-2xl"></div>
          <div className="absolute bottom-20 right-20 w-40 h-40 bg-white rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto px-4 text-center relative">
          <div className="space-y-10">
            <h2 className="text-4xl lg:text-6xl font-bold text-white text-balance leading-tight">
              Join Us in Building a Better Community
            </h2>
            <p className="text-xl lg:text-2xl text-blue-100 max-w-4xl mx-auto text-pretty leading-relaxed">
              This project for the Smart India Hackathon aims to redefine civic governance. Built with React, Node.js,
              and MongoDB, we offer a scalable and impactful solution.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link href="/signup">
                <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 px-10 py-4 text-lg font-semibold">
                  Get Started
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-white text-white hover:bg-white/10 px-10 py-4 text-lg font-semibold bg-transparent"
              >
                Meet The Team
                <Users className="w-5 h-5 ml-2" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      <footer id="contact" className="bg-gray-900 py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-12 mb-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-teal-600 rounded-lg flex items-center justify-center">
                  <Shield className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold text-white">CivicConnect</span>
              </div>
              <p className="text-gray-400 leading-relaxed">
                Empowering citizens and building better communities through transparent governance.
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white">Contact Info</h3>
              <div className="space-y-2 text-gray-400">
                <p>Email: team@civicconnect.gov.in</p>
                <p>Phone: +91 98765 43210</p>
                <p>Address: Smart India Hackathon 2024</p>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white">Follow Us</h3>
              <div className="flex space-x-4">
                <div className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-blue-600 transition-colors cursor-pointer">
                  <span className="text-white text-sm font-bold">f</span>
                </div>
                <div className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-blue-400 transition-colors cursor-pointer">
                  <span className="text-white text-sm font-bold">t</span>
                </div>
                <div className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-blue-700 transition-colors cursor-pointer">
                  <span className="text-white text-sm font-bold">in</span>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 text-center">
            <p className="text-gray-400">© 2024 Civic Grievance Redressal System. Built for Smart India Hackathon.</p>
          </div>
        </div>
      </footer>

      <div className="fixed bottom-6 right-6 z-50">
        <Button className="w-14 h-14 rounded-full bg-blue-600 hover:bg-blue-700 shadow-lg">
          <MessageCircle className="w-6 h-6 text-white" />
        </Button>
      </div>
    </div>
  )
}
