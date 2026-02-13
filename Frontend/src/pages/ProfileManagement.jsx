import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import Header from "../components/header"
import Footer from "../components/footer"
import JobSeekerSidebar from "../components/jobseekersidebar"

export default function ProfileManagement() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [userName, setUserName] = useState("")
  const [profile, setProfile] = useState(null)
  const [uploading, setUploading] = useState(false)
  const [uploadError, setUploadError] = useState("")

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
    // fetch profile if token available
    const token = localStorage.getItem('token')
    if (token) {
      fetch('/api/profile', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.user) setProfile(data.user)
        })
        .catch((err) => {
          console.error('Failed to fetch profile', err)
        })
    }
  }, [])

  if (!isAuthenticated) {
    return (
      <>
        <Header />
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Access Denied</h1>
            <p className="text-gray-600 mb-6">Please log in to access the profile management page.</p>
            <Link to="/login" className="bg-blue-600 text-white px-6 py-2 rounded-md font-medium hover:bg-blue-700">
              Go to Login
            </Link>
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
          <div className="max-w-5xl mx-auto px-4 py-8">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 mb-6 text-sm">
              <Link to="/dashboard" className="text-blue-600 hover:text-blue-700">
                Dashboard
              </Link>
              <span className="text-gray-400">/</span>
              <span className="text-gray-600">Profile Management</span>
            </div>

          {/* Header Section */}
          <div className="mb-8">
            <div className="flex items-start gap-3 mb-4">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-blue-600 text-lg">⚙️</span>
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Profile Management</h1>
                <p className="text-gray-600 text-sm">
                  Manage all aspects of your professional profile to attract the right job opportunities
                </p>
              </div>
            </div>
          </div>

          {/* Statistics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              {/* Profile Completion */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-3">
                <p className="text-gray-600 text-sm font-medium">Profile Completion</p>
                <span className="text-blue-600 text-lg">📊</span>
              </div>
              <h3 className="text-3xl font-bold text-gray-900">{Math.min(100, Math.round((
                ((profile?.name ? 1 : 0) + (profile?.bio ? 1 : 0) + (profile?.location ? 1 : 0) + (profile?.phone ? 1 : 0) + (profile?.resumes?.length ? 1 : 0)) / 5) * 100
              )) || '85'}%</h3>
              <p className="text-xs text-gray-500 mt-1">Keep improving to increase visibility</p>
            </div>

            {/* Resumes Uploaded */}
            <div className="rounded-lg border border-blue-300 bg-blue-50 p-6">
              <div className="flex items-center justify-between mb-3">
                <p className="text-blue-600 text-sm font-bold">Resumes Uploaded</p>
                <span className="text-green-600 text-lg">✓</span>
              </div>
              <h3 className="text-3xl font-bold text-gray-900">{profile?.resumes?.length ?? 0}</h3>
              <p className="text-xs text-gray-500 mt-1">You can upload up to 5 resumes</p>
            </div>

            {/* Applications */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-3">
                <p className="text-gray-600 text-sm font-medium">Applications</p>
                <span className="text-purple-600 text-lg">📋</span>
              </div>
              <h3 className="text-3xl font-bold text-gray-900">{profile?.applicationsCount ?? 0}</h3>
              <p className="text-xs text-gray-500 mt-1">Active applications in progress</p>
            </div>
          </div>

          {/* Profile Sections */}
          <div className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Profile Sections</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Personal Information */}
              <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow">
                <div className="flex items-start gap-3 mb-4">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-blue-600 text-lg">👤</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900">Personal Information</h3>
                    <p className="text-xs text-green-600 font-medium mt-1">✓ Complete</p>
                  </div>
                </div>
                <p className="text-sm text-gray-600 mb-4">
                  Manage your name, location, bio, and career preferences. Keep your profile up-to-date to help
                  employers find you.
                </p>
                <Link
                  to="/profile-details"
                  className="block text-center bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md font-medium text-sm transition-colors"
                >
                  Manage Profile Details →
                </Link>
              </div>

              {/* Resume Management */}
              <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow">
                <div className="flex items-start gap-3 mb-4">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-green-600 text-lg">📄</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900">Resume Management</h3>
                    <p className="text-xs text-gray-600 font-medium mt-1">2 Resumes</p>
                  </div>
                </div>
                <p className="text-sm text-gray-600 mb-4">
                  Upload, view, and manage your resumes. Set a default resume that will be sent with your job
                  applications.
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Link
                    to="/resume-management"
                    className="text-center bg-white border border-blue-600 text-blue-600 px-4 py-2 rounded-md font-medium text-sm transition-colors hover:bg-blue-50"
                  >
                    Manage Resumes →
                  </Link>

                  <label className="cursor-pointer bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md font-medium text-sm text-center">
                    {uploading ? 'Uploading...' : 'Upload Resume'}
                    <input
                      type="file"
                      name="resume"
                      accept=".pdf,.doc,.docx"
                      className="hidden"
                      onChange={async (e) => {
                        const file = e.target.files[0]
                        if (!file) return
                        setUploading(true)
                        setUploadError('')
                        const token = localStorage.getItem('token')
                        const formData = new FormData()
                        formData.append('resume', file)

                        try {
                          const res = await fetch('/api/profile/resume', {
                            method: 'POST',
                            headers: {
                              Authorization: `Bearer ${token}`,
                            },
                            body: formData,
                          })
                          const data = await res.json()
                          if (!res.ok) {
                            setUploadError(data.message || 'Upload failed')
                          } else {
                            setProfile((p) => ({ ...p, resumes: data.resumes }))
                          }
                        } catch (err) {
                          console.error(err)
                          setUploadError('Upload failed')
                        } finally {
                          setUploading(false)
                        }
                      }}
                    />
                  </label>
                </div>
                {uploadError && <p className="text-xs text-red-600 mt-2">{uploadError}</p>}
              </div>

              {/* Contact Details */}
              <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow">
                <div className="flex items-start gap-3 mb-4">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-blue-600 text-lg">✉️</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900">Contact Details</h3>
                    <p className="text-xs text-blue-600 font-medium mt-1">✓ Updated</p>
                  </div>
                </div>
                <p className="text-sm text-gray-600 mb-4">
                  Update your email, phone number, and social media links. Employers use this to reach out to you.
                </p>
                <Link
                  to="/contact-details"
                  className="block text-center bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md font-medium text-sm transition-colors"
                >
                  Edit Contact Details →
                </Link>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Link
                to="/applied-jobs"
                className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow flex items-center gap-4 group"
              >
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                  <span className="text-blue-600 text-lg">📁</span>
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">View Applied Jobs</h3>
                  <p className="text-sm text-gray-600">Check your application status</p>
                </div>
              </Link>

              <Link
                to="/jobs"
                className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow flex items-center gap-4 group"
              >
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center group-hover:bg-green-200 transition-colors">
                  <span className="text-green-600 text-lg">🔍</span>
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">Search for Jobs</h3>
                  <p className="text-sm text-gray-600">Find new opportunities</p>
                </div>
              </Link>
            </div>
          </div>

          {/* Bottom Actions */}
          <div className="flex items-center justify-between">
            <Link
              to="/dashboard"
              className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium text-sm"
            >
              ← Back to Dashboard
            </Link>
            <Link
              to="/profile-details"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md font-medium text-sm transition-colors flex items-center gap-2"
            >
              → View Full Profile
            </Link>
            </div>
          </div>
        </main>
      </div>
      <Footer />
    </div>
  )
}
