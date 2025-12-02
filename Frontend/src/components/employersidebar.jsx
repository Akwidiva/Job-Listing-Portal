import { useState } from "react"
import { Link, useLocation } from "react-router-dom"

export default function EmployerSidebar() {
  const location = useLocation()
  const pathname = location.pathname
  const [companyName] = useState(() => {
    if (typeof window !== "undefined") {
      const user = localStorage.getItem("user")
      return user ? JSON.parse(user).companyName || "Company" : "Company"
    }
    return "Company"
  })

  const isActive = (path) => pathname === path

  return (
    <aside className="w-48 bg-white border-r border-gray-200 min-h-screen flex flex-col">
      {/* Company Profile Section */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
            <span className="text-white font-bold text-sm">{companyName.charAt(0).toUpperCase()}</span>
          </div>
          <div className="min-w-0">
            <p className="font-semibold text-gray-900 text-xs truncate">{companyName}</p>
            <p className="text-gray-600 text-xs">Employer</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-3 space-y-1">
        {/* Navigation Section */}
        <div className="mb-4">
          <p className="text-xs font-semibold text-gray-500 uppercase mb-2 px-2">Navigation</p>
          <div className="space-y-1">
            <Link
              to="/employer-dashboard"
              className={`w-full text-left px-3 py-2 rounded text-xs font-medium transition-colors ${
                isActive("/employer-dashboard")
                  ? "bg-blue-100 text-blue-600"
                  : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
              }`}
            >
              📊 Dashboard
            </Link>
            <Link
              to="/job-listings"
              className={`w-full text-left px-3 py-2 rounded text-xs font-medium transition-colors ${
                isActive("/job-listings")
                  ? "bg-blue-100 text-blue-600"
                  : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
              }`}
            >
              📋 Job Listings
            </Link>
            <Link
              to="/create-job-listing"
              className={`w-full text-left px-3 py-2 rounded text-xs font-medium transition-colors ${
                isActive("/create-job-listing")
                  ? "bg-blue-100 text-blue-600"
                  : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
              }`}
            >
              ➕ Create Job Listing
            </Link>
            <Link
              to="/applications"
              className={`w-full text-left px-3 py-2 rounded text-xs font-medium transition-colors ${
                isActive("/applications")
                  ? "bg-blue-100 text-blue-600"
                  : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
              }`}
            >
              📧 Applications
            </Link>
            <Link
              to="/company-profile"
              className={`w-full text-left px-3 py-2 rounded text-xs font-medium transition-colors ${
                isActive("/company-profile")
                  ? "bg-blue-100 text-blue-600"
                  : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
              }`}
            >
              🏢 Company Profile
            </Link>
          </div>
        </div>

        <div>
          <p className="text-xs font-semibold text-gray-500 uppercase mb-2 px-2">Account</p>
          <div className="space-y-1">
            <Link
              to="/settings"
              className="w-full text-left px-3 py-2 rounded text-xs font-medium text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-colors"
            >
              ⚙️ Settings
            </Link>
            <Link
              to="/help"
              className="w-full text-left px-3 py-2 rounded text-xs font-medium text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-colors"
            >
              ❓ Help & Support
            </Link>
          </div>
        </div>
      </nav>

      <div className="p-3 border-t border-gray-200">
        <button
          onClick={() => {
            localStorage.removeItem("user")
            window.location.href = "/"
          }}
          className="w-full px-3 py-2 text-red-600 hover:bg-red-50 rounded text-xs font-medium transition-colors border border-red-200"
        >
          🚪 Logout
        </button>
      </div>
    </aside>
  )
}
