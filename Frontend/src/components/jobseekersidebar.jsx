import { useState } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"

export default function JobSeekerSidebar() {
  const { pathname } = useLocation()
  const [userName] = useState(() => {
    if (typeof window !== "undefined") {
      const user = localStorage.getItem("user")
      return user ? JSON.parse(user).name || "User" : "User"
    }
    return "User"
  })

  const isActive = (path) => pathname === path

  return (
    <aside className="w-48 bg-white border-r border-gray-200 min-h-screen flex flex-col">
      <div className="flex-1"></div>
      <div className="pt-3 px-3 pb-0 space-y-1">
        {/* User Profile Section */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-white font-bold text-sm">{userName.charAt(0).toUpperCase()}</span>
            </div>
            <div className="min-w-0">
              <p className="font-semibold text-gray-900 text-xs truncate">{userName}</p>
              <p className="text-gray-600 text-xs">Job Seeker</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        {/* Navigation Section */}
        <div className="mb-4 pt-3">
          <p className="text-xs font-semibold text-gray-500 uppercase mb-2 px-2">Navigation</p>
          <ul className="space-y-2">
            <li>
              <Link
                to="/dashboard"
                className={`w-full text-left px-3 py-2 rounded text-xs font-medium transition-colors ${
                  isActive("/dashboard")
                    ? "bg-blue-100 text-blue-600"
                    : "text-black hover:bg-gray-100 hover:text-gray-900"
                }`}
              >
  Dashboard
              </Link>
            </li>
            <li>
              <Link
                to="/jobs"
                className={`w-full text-left px-3 py-2 rounded text-xs font-medium transition-colors ${
                  isActive("/jobs") ? "bg-blue-100 text-blue-600" : "text-black hover:bg-gray-100 hover:text-gray-900"
                }`}
              >
  Find Jobs
              </Link>
            </li>
            <li>
              <Link
                to="/applied-jobs"
                className={`w-full text-left px-3 py-2 rounded text-xs font-medium transition-colors ${
                  isActive("/applied-jobs")
                    ? "bg-blue-100 text-blue-600"
                    : "text-black hover:bg-gray-100 hover:text-gray-900"
                }`}
              >
  Applied Jobs
              </Link>
            </li>
            <li>
              <Link
                to="/profile"
                className={`w-full text-left px-3 py-2 rounded text-xs font-medium transition-colors ${
                  isActive("/profile")
                    ? "bg-blue-100 text-blue-600"
                    : "text-black hover:bg-gray-100 hover:text-gray-900"
                }`}
              >
  My Profile
              </Link>
            </li>
            <li>
              <Link
                to="/resume"
                className={`w-full text-left px-3 py-2 rounded text-xs font-medium transition-colors ${
                  isActive("/resume")
                    ? "bg-blue-100 text-blue-600"
                    : "text-black hover:bg-gray-100 hover:text-gray-900"
                }`}
              >
  Resume Management
              </Link>
            </li>
          </ul>
        </div>

        <div className="border-t border-gray-200 pt-3">
          <p className="text-xs font-semibold text-gray-500 uppercase mb-2 px-2">Account</p>
          <ul className="space-y-2">
            <li>
              <Link
                to="/settings"
                className="w-full text-left px-3 py-2 rounded text-xs font-medium text-black hover:bg-gray-100 hover:text-gray-900 transition-colors"
              >
  Settings
              </Link>
            </li>
            <li>
              <Link
                to="/help"
                className="w-full text-left px-3 py-2 rounded text-xs font-medium text-black hover:bg-gray-100 hover:text-gray-900 transition-colors"
              >
  Help & Support
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="p-3 border-t border-gray-200">
        <button
          onClick={() => {
            localStorage.removeItem("user")
            window.location.href = "/"
          }}
          className="w-full px-3 py-2 text-red-600 hover:bg-red-50 rounded text-xs font-medium transition-colors border border-red-200"
        >
Logout
        </button>
      </div>
    </aside>
  )
}