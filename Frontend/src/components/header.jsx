import { Link } from "react-router-dom"
import { useState, useEffect } from "react"

export default function Header() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [userName, setUserName] = useState("")
  const [userType, setUserType] = useState("")
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const user = localStorage.getItem("user")
    if (user) {
      try {
        const userData = JSON.parse(user)
        setIsAuthenticated(true)
        setUserName(userData.name || userData.email.split('@')[0] || "User")
        const displayUserType = userData.userType === 'employer' ? 'Employer' : 'Job Seeker'
        setUserType(displayUserType)
      } catch (e) {
        setIsAuthenticated(false)
      }
    }
  }, [])

  if (!mounted) return null

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="inline-flex items-center gap-2 hover:opacity-80 transition-opacity">
          <div className="w-8 h-8 bg-blue-600 rounded-md flex items-center justify-center">
            <span className="text-white font-bold text-sm">S</span>
          </div>
          <span className="text-xl font-bold text-gray-900">Skillora</span>
        </Link>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-8">
          {userType === 'Employer' ? (
            <>
              <Link to="/employer-dashboard" className="text-gray-600 hover:text-gray-900 font-medium text-sm transition-colors">
                Dashboard
              </Link>
              <Link to="/job-listings" className="text-gray-600 hover:text-gray-900 font-medium text-sm transition-colors">
                Job Listings
              </Link>
              <Link to="/applications" className="text-gray-600 hover:text-gray-900 font-medium text-sm transition-colors">
                Applications
              </Link>
            </>
          ) : (
            <>
              <Link to="/jobs" className="text-gray-600 hover:text-gray-900 font-medium text-sm transition-colors">
                Find Jobs
              </Link>
              <Link to="/employers" className="text-gray-600 hover:text-gray-900 font-medium text-sm transition-colors">
                For Employers
              </Link>
              <Link to="/about" className="text-gray-600 hover:text-gray-900 font-medium text-sm transition-colors">
                About
              </Link>
            </>
          )}
        </nav>

        <div className="flex items-center gap-4">
          {isAuthenticated ? (
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">{userName.charAt(0).toUpperCase()}</span>
              </div>
              <div className="hidden sm:flex flex-col">
                <span className="text-gray-900 font-medium text-sm">{userName}</span>
                <span className="text-gray-500 text-xs">{userType}</span>
              </div>
              <button
                onClick={() => {
                  localStorage.removeItem("user")
                  setIsAuthenticated(false)
                  window.location.href = "/"
                }}
                className="text-gray-600 hover:text-red-600 font-medium text-sm transition-colors ml-4"
              >
                Logout
              </button>
            </div>
          ) : (
            <>
              <Link to="/login" className="text-gray-600 hover:text-blue-600 font-medium text-sm transition-colors">
                Login
              </Link>
              <Link
                to="/register"
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  )
}
