import { useState } from "react"
import { Link, useLocation } from "react-router-dom"

export default function EmployerSidebar() {
  const location = useLocation()
  const pathname = location.pathname
  const [personName] = useState(() => {
    if (typeof window !== "undefined") {
      const user = localStorage.getItem("user")
      if (user) {
        const userData = JSON.parse(user)
        return userData.name || `${userData.firstName || ""} ${userData.lastName || ""}`.trim() || "Employer"
      }
    }
    return "Employer"
  })

  const isActive = (path) => pathname === path

  return (
    <aside className="w-48 bg-white border-r border-gray-200 min-h-screen flex flex-col pt-6">
      {/* Top spacer increases distance from header */}
      <div className="h-4" />

      {/* Main area pushes profile+nav toward bottom */}
      <div className="flex-1 flex flex-col justify-end p-3">
        {/* Employer Profile Section - placed near bottom */}
        <div className="p-3 border-t border-gray-100 mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-white font-bold text-sm">{personName.charAt(0).toUpperCase()}</span>
            </div>
            <div className="min-w-0">
              <p className="font-semibold text-gray-900 text-sm truncate">{personName}</p>
              <p className="text-gray-600 text-xs">Employer</p>
            </div>
          </div>
        </div>

        {/* Navigation - semantic list */}
        <nav aria-label="Employer navigation" className="mb-4">
          <p className="text-xs font-semibold text-gray-500 uppercase mb-2 px-2">Navigation</p>
          <ul className="space-y-1">
            <li>
              <Link
                to="/employer-dashboard"
                className={`block w-full text-left px-3 py-2 rounded text-sm font-medium transition-colors ${
                  isActive("/employer-dashboard")
                    ? "bg-blue-100 text-blue-600"
                    : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                }`}
              >
                📊 Dashboard
              </Link>
            </li>
            <li>
              <Link
                to="/job-listings"
                className={`block w-full text-left px-3 py-2 rounded text-sm font-medium transition-colors ${
                  isActive("/job-listings")
                    ? "bg-blue-100 text-blue-600"
                    : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                }`}
              >
                📋 Job Listings
              </Link>
            </li>
            <li>
              <Link
                to="/applications"
                className={`block w-full text-left px-3 py-2 rounded text-sm font-medium transition-colors ${
                  isActive("/applications")
                    ? "bg-blue-100 text-blue-600"
                    : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                }`}
              >
                📧 Applications
              </Link>
            </li>
            <li>
              <Link
                to="/company-profile"
                className={`block w-full text-left px-3 py-2 rounded text-sm font-medium transition-colors ${
                  isActive("/company-profile")
                    ? "bg-blue-100 text-blue-600"
                    : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                }`}
              >
                🏢 Company Profile
              </Link>
            </li>
          </ul>

          <div className="border-t border-gray-200 mt-4 mb-4" />

          <p className="text-xs font-semibold text-gray-500 uppercase mb-2 px-2">Account</p>
          <ul className="space-y-1">
            <li>
              <Link
                to="/settings"
                className="block w-full text-left px-3 py-2 rounded text-sm font-medium text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-colors"
              >
                ⚙️ Settings
              </Link>
            </li>
            <li>
              <Link
                to="/help"
                className="block w-full text-left px-3 py-2 rounded text-sm font-medium text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-colors"
              >
                ❓ Help & Support
              </Link>
            </li>
          </ul>
        </nav>
      </div>

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
