import { useEffect, useState } from "react"
import Header from "../components/header"
import Footer from "../components/footer"
import JobSeekerSidebar from "../components/jobseekersidebar"

export default function ProfileDetails() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [userName, setUserName] = useState("")

  useEffect(() => {
    const user = localStorage.getItem("user")
    if (user) {
      try {
        const userData = JSON.parse(user)
        setIsAuthenticated(true)
        setUserName(userData.name || userData.email)
      } catch (e) {
        setIsAuthenticated(false)
      }
    }
  }, [])

  if (!isAuthenticated) {
    return (
      <>
        <Header />
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Access Denied</h1>
            <p className="text-gray-600 mb-6">Please log in to access the profile details page.</p>
            <href to="/login" className="bg-blue-600 text-white px-6 py-2 rounded-md font-medium hover:bg-blue-700">
              Go to Login
            </href>
          </div>
        </div>
        <Footer />
      </>
    )
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />
      <div className="flex flex-1">
        <JobSeekerSidebar />
        <main className="flex-1 bg-gray-50 overflow-auto">
          <div className="max-w-4xl mx-auto px-4 py-8">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 mb-6 text-sm">
              <href to="/dashboard" className="text-blue-600 hover:text-blue-700">
                Dashboard
              </href>
            <span className="text-gray-400">/</span>
            <href to="/profile-management" className="text-blue-600 hover:text-blue-700">
              Profile Management
            </href>
            <span className="text-gray-400">/</span>
            <span className="text-gray-600">Profile Details</span>
          </div>

          {/* Page Header */}
          <div className="mb-8">
            <div className="flex items-start justify-between gap-4 mb-4">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-blue-600 text-lg">👤</span>
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">Profile Details</h1>
                  <p className="text-gray-600 text-sm">
                    View and manage your personal information, resumes, and contact details
                  </p>
                </div>
              </div>
              <href
                to="/profile"
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md font-medium text-sm transition-colors"
              >
                Edit Profile
              </href>
            </div>
          </div>

          {/* Personal Information Section */}
          <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <span className="text-lg">👤</span>
                <h2 className="text-lg font-bold text-gray-900">Personal Information</h2>
              </div>
              <href to="/profile" className="text-blue-600 hover:text-blue-700 font-medium text-sm">
                Edit
              </href>
            </div>

            <div className="mb-6">
              <h3 className="text-lg font-bold text-gray-900 mb-2">John Doe</h3>
              <span className="inline-block bg-green-100 text-green-700 text-xs font-bold px-3 py-1 rounded-full mb-4">
                Full Stack Developer
              </span>
              <p className="text-gray-600 text-sm mb-4">
                Passionate about building scalable web applications with modern technologies. 5+ years of experience in
                software development.
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              <div>
                <p className="text-gray-500 text-sm font-medium mb-1">Location</p>
                <p className="text-gray-900 font-medium">San Francisco, CA</p>
              </div>
              <div>
                <p className="text-gray-500 text-sm font-medium mb-1">Email</p>
                <p className="text-gray-900 font-medium">john.doe@example.com</p>
              </div>
              <div>
                <p className="text-gray-500 text-sm font-medium mb-1">Phone</p>
                <p className="text-gray-900 font-medium">+1 (555) 123-4567</p>
              </div>
              <div>
                <p className="text-gray-500 text-sm font-medium mb-1">Date of Birth</p>
                <p className="text-gray-900 font-medium">May 15, 1990</p>
              </div>
              <div>
                <p className="text-gray-500 text-sm font-medium mb-1">Nationality</p>
                <p className="text-gray-900 font-medium">United States</p>
              </div>
            </div>
          </div>

          {/* Resumes Section */}
          <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                  <span className="text-lg">📄</span>
                  Resumes
                </h2>
                <p className="text-gray-600 text-sm mt-1">Your uploaded resume files</p>
              </div>
              <href to="/resume-management" className="text-blue-600 hover:text-blue-700 font-medium text-sm">
                Manage
              </href>
            </div>

            <div className="space-y-4">
              {/* Resume 1 */}
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200 hover:border-gray-300 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-blue-100 rounded flex items-center justify-center flex-shrink-0">
                    <span className="text-blue-600 text-lg">📋</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900">John_Doe_Resume_2024.pdf</h3>
                    <p className="text-xs text-gray-500 mt-1">245 KB • Uploaded Jan 15, 2024</p>
                  </div>
                  <span className="inline-block bg-green-100 text-green-700 text-xs font-bold px-2 py-1 rounded">
                    Default
                  </span>
                </div>
                <button className="text-gray-600 hover:text-blue-600 text-lg">⬇</button>
              </div>

              {/* Resume 2 */}
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200 hover:border-gray-300 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-blue-100 rounded flex items-center justify-center flex-shrink-0">
                    <span className="text-blue-600 text-lg">📋</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900">John_Doe_Resume_Technical.pdf</h3>
                    <p className="text-xs text-gray-500 mt-1">198 KB • Uploaded Nov 20, 2023</p>
                  </div>
                </div>
                <button className="text-gray-600 hover:text-blue-600 text-lg">⬇</button>
              </div>
            </div>
          </div>

          {/* Contact Details Section */}
          <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                  <span className="text-lg">✉️</span>
                  Contact Details
                </h2>
                <p className="text-gray-600 text-sm mt-1">Your contact information and social profiles</p>
              </div>
              <href to="/profile" className="text-blue-600 hover:text-blue-700 font-medium text-sm">
                Edit
              </href>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <p className="text-gray-500 text-sm font-medium mb-2 flex items-center gap-2">
                  <span>✉️</span> Email
                </p>
                <p className="text-blue-600 hover:underline cursor-pointer font-medium">john.doe@example.com</p>
              </div>
              <div>
                <p className="text-gray-500 text-sm font-medium mb-2 flex items-center gap-2">
                  <span>📱</span> Phone
                </p>
                <p className="text-gray-900 font-medium">+1 (555) 123-4567</p>
              </div>
              <div>
                <p className="text-gray-500 text-sm font-medium mb-2 flex items-center gap-2">
                  <span>🔗</span> LinkedIn
                </p>
                <p className="text-blue-600 hover:underline cursor-pointer font-medium">
                  https://linkedin.com/in/johndoe
                </p>
              </div>
              <div>
                <p className="text-gray-500 text-sm font-medium mb-2 flex items-center gap-2">
                  <span>🌐</span> Portfolio
                </p>
                <p className="text-blue-600 hover:underline cursor-pointer font-medium">https://johndoe.dev</p>
              </div>
              <div>
                <p className="text-gray-500 text-sm font-medium mb-2 flex items-center gap-2">
                  <span>💻</span> GitHub
                </p>
                <p className="text-blue-600 hover:underline cursor-pointer font-medium">https://github.com/johndoe</p>
              </div>
              <div>
                <p className="text-gray-500 text-sm font-medium mb-2 flex items-center gap-2">
                  <span>𝕏</span> Twitter
                </p>
                <p className="text-blue-600 hover:underline cursor-pointer font-medium">https://twitter.com/johndoe</p>
              </div>
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="flex items-center justify-between">
            <href
              to="/profile-management"
              className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium text-sm"
            >
              ← Back to Profile Management
            </href>
            <href
              to="/dashboard"
              className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium text-sm"
            >
              Go to Dashboard →
            </href>
            </div>
          </div>
        </main>
      </div>
      <Footer />
    </div>
  )
}
