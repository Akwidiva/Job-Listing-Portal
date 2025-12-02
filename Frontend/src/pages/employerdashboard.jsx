import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import Header from "../components/header"
import Footer from "../components/footer"
import EmployerSidebar from "../components/employersidebar"


export default function EmployerDashboard() {
  const navigate = useNavigate()
  const [companyName, setCompanyName] = useState("")
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const user = localStorage.getItem("user")
    if (!user) {
      navigate("/login")
      return
    }
    try {
      const userData = JSON.parse(user)
      if (userData.userType !== "employer") {
        navigate("/dashboard")
        return
      }
      setCompanyName(userData.companyName || "Company")
    } catch {
      navigate("/login")
      return
    }
    setIsLoading(false)
  }, [navigate])

  if (isLoading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />

      <div className="flex flex-1">
        <EmployerSidebar />

        {/* Main Content */}
        <main className="flex-1 overflow-auto">
          {/* Dashboard Header */}
          <section className="bg-white px-8 py-8 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Employer Dashboard</h1>
                <p className="text-gray-600 text-sm">
                  Manage your job listings, applications, and recruitment activities
                </p>
              </div>
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md font-medium transition-colors">
                + Post New Job
              </button>
            </div>
          </section>

          {/* Statistics Cards */}
          <section className="px-8 py-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
              {/* Active Job Listings */}
              <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-gray-600 font-semibold">Active Job Listings</h3>
                  <span className="text-2xl">📋</span>
                </div>
                <p className="text-4xl font-bold text-gray-900 mb-2">12</p>
                <p className="text-green-600 text-sm">+2 from last month</p>
              </div>

              {/* Total Applications */}
              <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-gray-600 font-semibold">Total Applications</h3>
                  <span className="text-2xl">👥</span>
                </div>
                <p className="text-4xl font-bold text-gray-900 mb-2">48</p>
                <p className="text-green-600 text-sm">+8 applications</p>
              </div>

              {/* Pending Reviews */}
              <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-gray-600 font-semibold">Pending Reviews</h3>
                  <span className="text-2xl">⏳</span>
                </div>
                <p className="text-4xl font-bold text-gray-900 mb-2">15</p>
                <p className="text-red-600 text-sm">-3 pending</p>
              </div>

              {/* Hired Candidates */}
              <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-gray-600 font-semibold">Hired Candidates</h3>
                  <span className="text-2xl">✓</span>
                </div>
                <p className="text-4xl font-bold text-gray-900 mb-2">7</p>
                <p className="text-green-600 text-sm">+1 hired</p>
              </div>
            </div>

            {/* Active Job Listings Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Job Listings */}
              <div className="lg:col-span-2">
                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900">Active Job Listings</h2>
                      <p className="text-gray-600 text-sm">Manage and monitor your job postings</p>
                    </div>
                    <a href="/job-listings" className="text-blue-600 font-semibold text-sm hover:underline">
                      View All →
                    </a>
                  </div>

                  {/* Job Cards */}
                  <div className="space-y-4">
                    {/* Job Card 1 */}
                    <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="text-lg font-bold text-gray-900">Senior React Developer</h3>
                          <p className="text-green-600 font-semibold text-xs mt-1">Active</p>
                        </div>
                        <div className="flex gap-2">
                          <button className="text-gray-600 hover:text-gray-900">✏️</button>
                          <button className="text-gray-600 hover:text-gray-900">👁️</button>
                        </div>
                      </div>
                      <div className="text-gray-600 text-sm space-y-1">
                        <p>📍 San Francisco, CA</p>
                        <p>👥 12 applicants • 👁️ 245 views • 📅 1/15/2024</p>
                      </div>
                    </div>

                    {/* Job Card 2 */}
                    <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="text-lg font-bold text-gray-900">Product Manager</h3>
                          <p className="text-green-600 font-semibold text-xs mt-1">Active</p>
                        </div>
                        <div className="flex gap-2">
                          <button className="text-gray-600 hover:text-gray-900">✏️</button>
                          <button className="text-gray-600 hover:text-gray-900">👁️</button>
                        </div>
                      </div>
                      <div className="text-gray-600 text-sm space-y-1">
                        <p>📍 New York, NY</p>
                        <p>👥 8 applicants • 👁️ 180 views • 📅 1/10/2024</p>
                      </div>
                    </div>

                    {/* Job Card 3 */}
                    <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="text-lg font-bold text-gray-900">UX/UI Designer</h3>
                          <p className="text-green-600 font-semibold text-xs mt-1">Active</p>
                        </div>
                        <div className="flex gap-2">
                          <button className="text-gray-600 hover:text-gray-900">✏️</button>
                          <button className="text-gray-600 hover:text-gray-900">👁️</button>
                        </div>
                      </div>
                      <div className="text-gray-600 text-sm space-y-1">
                        <p>📍 Remote</p>
                        <p>👥 15 applicants • 👁️ 312 views • 📅 1/8/2024</p>
                      </div>
                    </div>

                    {/* Job Card 4 */}
                    <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="text-lg font-bold text-gray-900">DevOps Engineer</h3>
                          <p className="bg-yellow-100 text-yellow-700 font-semibold text-xs px-2 py-1 rounded mt-1 w-fit">
                            Draft
                          </p>
                        </div>
                        <div className="flex gap-2">
                          <button className="text-gray-600 hover:text-gray-900">✏️</button>
                          <button className="text-gray-600 hover:text-gray-900">👁️</button>
                        </div>
                      </div>
                      <div className="text-gray-600 text-sm space-y-1">
                        <p>📍 Austin, TX</p>
                        <p>👥 5 applicants • 👁️ 0 views • 📅 1/20/2024</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Actions Sidebar */}
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-6">Quick Actions</h3>
                <div className="space-y-3">
                  <button
                    onClick={() => navigate("/create-job-listing")}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-md font-medium transition-colors flex items-center justify-center gap-2"
                  >
                    + Post New Job
                  </button>
                  <button className="w-full bg-white border border-gray-200 hover:bg-gray-50 text-gray-900 px-4 py-3 rounded-md font-medium transition-colors flex items-center gap-2">
                    📋 Manage Listings
                  </button>
                  <button className="w-full bg-white border border-gray-200 hover:bg-gray-50 text-gray-900 px-4 py-3 rounded-md font-medium transition-colors flex items-center gap-2">
                    📧 View Applications
                  </button>
                  <button className="w-full bg-white border border-gray-200 hover:bg-gray-50 text-gray-900 px-4 py-3 rounded-md font-medium transition-colors flex items-center gap-2">
                    🏢 Company Profile
                  </button>
                </div>
              </div>
            </div>

            {/* Recent Applications */}
            <div className="mt-8 bg-white border border-gray-200 rounded-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Recent Applications</h2>
                  <p className="text-gray-600 text-sm">Latest applications from job seekers</p>
                </div>
                <a href="/applications" className="text-blue-600 font-semibold text-sm hover:underline">
                  View All →
                </a>
              </div>

              {/* Application List */}
              <div className="space-y-4">
                {/* Application 1 */}
                <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center font-bold text-blue-600">
                        S
                      </div>
                      <div>
                        <p className="font-bold text-gray-900">Sarah Johnson</p>
                        <p className="text-gray-600 text-sm">Senior React Developer</p>
                        <p className="text-gray-500 text-xs">Applied 1/22/2024</p>
                      </div>
                    </div>
                    <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-xs font-semibold">New</span>
                  </div>
                </div>

                {/* Application 2 */}
                <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center font-bold text-purple-600">
                        M
                      </div>
                      <div>
                        <p className="font-bold text-gray-900">Michael Chen</p>
                        <p className="text-gray-600 text-sm">Product Manager</p>
                        <p className="text-gray-500 text-xs">Applied 1/21/2024</p>
                      </div>
                    </div>
                    <span className="bg-purple-100 text-purple-600 px-3 py-1 rounded-full text-xs font-semibold">
                      Reviewing
                    </span>
                  </div>
                </div>

                {/* Application 3 */}
                <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center font-bold text-green-600">
                        E
                      </div>
                      <div>
                        <p className="font-bold text-gray-900">Emily Rodriguez</p>
                        <p className="text-gray-600 text-sm">UX/UI Designer</p>
                        <p className="text-gray-500 text-xs">Applied 1/20/2024</p>
                      </div>
                    </div>
                    <span className="bg-green-100 text-green-600 px-3 py-1 rounded-full text-xs font-semibold">
                      Shortlisted
                    </span>
                  </div>
                </div>

                {/* Application 4 */}
                <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center font-bold text-orange-600">
                        D
                      </div>
                      <div>
                        <p className="font-bold text-gray-900">David Park</p>
                        <p className="text-gray-600 text-sm">Senior React Developer</p>
                        <p className="text-gray-500 text-xs">Applied 1/18/2024</p>
                      </div>
                    </div>
                    <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-xs font-semibold">New</span>
                  </div>
                </div>

                {/* Application 5 */}
                <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-pink-100 rounded-full flex items-center justify-center font-bold text-pink-600">
                        J
                      </div>
                      <div>
                        <p className="font-bold text-gray-900">Jessica Lee</p>
                        <p className="text-gray-600 text-sm">Product Manager</p>
                        <p className="text-gray-500 text-xs">Applied 1/16/2024</p>
                      </div>
                    </div>
                    <span className="bg-purple-100 text-purple-600 px-3 py-1 rounded-full text-xs font-semibold">
                      Reviewing
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>

      <Footer />
    </div>
  )
}
