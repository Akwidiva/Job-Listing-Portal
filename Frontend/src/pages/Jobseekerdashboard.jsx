import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import Header from '../components/header'
import Footer from '../components/footer'
import Sidebar from "../components/sidebar"

export default function Dashboard() {
  const navigate = useNavigate()
  const [userName, setUserName] = useState("")
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const user = localStorage.getItem("user")
    if (!user) {
      navigate("/login")
      return
    }
    try {
      const userData = JSON.parse(user)
      setUserName(userData.name || userData.email)
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
        <Sidebar />

        {/* Main Content */}
        <main className="flex-1 overflow-auto">
          {/* Welcome Section */}
          <section className="bg-gradient-to-r from-blue-50 to-blue-100 px-8 py-8 border-b border-gray-200">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                <span className="text-white text-xl">👤</span>
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Welcome back, {userName}!</h1>
                <p className="text-gray-600 text-sm">Track your applications and manage your job search</p>
              </div>
            </div>
          </section>

          {/* Quick Actions and Stats */}
          <section className="px-8 py-8">
            {/* Quick Action Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              {/* Search Jobs Card */}
              <div className="bg-blue-600 text-white rounded-lg p-6 hover:shadow-lg transition-shadow cursor-pointer">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-3xl">🔍</span>
                </div>
                <h3 className="text-xl font-bold mb-2">Search Jobs</h3>
                <p className="text-blue-100 text-sm">Find new job opportunities</p>
              </div>

              {/* Manage Profile Card */}
              <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow cursor-pointer">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-3xl">👤</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Manage Profile</h3>
                <p className="text-gray-600 text-sm">Update your profile information</p>
              </div>

              {/* Resume Management Card */}
              <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow cursor-pointer">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-3xl">📄</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Resume Management</h3>
                <p className="text-gray-600 text-sm">Upload and manage your resumes</p>
              </div>
            </div>

            {/* Statistics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              {/* Total Applied */}
              <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-gray-600 font-semibold">Total Applied</h3>
                  <span className="text-2xl">📁</span>
                </div>
                <p className="text-4xl font-bold text-gray-900 mb-2">3</p>
                <p className="text-gray-600 text-sm">Job applications submitted</p>
              </div>

              {/* Under Review */}
              <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-gray-600 font-semibold">Under Review</h3>
                  <span className="text-2xl">⏳</span>
                </div>
                <p className="text-4xl font-bold text-gray-900 mb-2">1</p>
                <p className="text-gray-600 text-sm">Applications being reviewed</p>
              </div>

              {/* Interviewing */}
              <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-gray-600 font-semibold">Interviewing</h3>
                  <span className="text-2xl">👥</span>
                </div>
                <p className="text-4xl font-bold text-gray-900 mb-2">1</p>
                <p className="text-gray-600 text-sm">Interview opportunities</p>
              </div>
            </div>

            {/* Recent Applications */}
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Recent Applications</h2>
                  <p className="text-gray-600 text-sm">Track the status of your job applications</p>
                </div>
                <a href="/applied-jobs" className="text-blue-600 font-semibold text-sm hover:underline">
                  View All →
                </a>
              </div>

              {/* Table */}
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="border-b border-gray-200">
                    <tr>
                      <th className="text-left py-4 px-4 text-gray-600 font-semibold text-sm">Job Title</th>
                      <th className="text-left py-4 px-4 text-gray-600 font-semibold text-sm">Company</th>
                      <th className="text-left py-4 px-4 text-gray-600 font-semibold text-sm">Applied Date</th>
                      <th className="text-left py-4 px-4 text-gray-600 font-semibold text-sm">Status</th>
                      <th className="text-left py-4 px-4 text-gray-600 font-semibold text-sm">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* Application Row 1 */}
                    <tr className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
                      <td className="py-4 px-4">
                        <a href="#" className="text-blue-600 font-semibold hover:underline">
                          Senior Backend Engineer (Node.js)
                        </a>
                      </td>
                      <td className="py-4 px-4 text-gray-700">Tech Innovators Inc</td>
                      <td className="py-4 px-4 text-gray-600 text-sm">Nov 21, 2025</td>
                      <td className="py-4 px-4">
                        <span className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-semibold">
                          ✓ Under Review
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <a href="#" className="text-blue-600 font-semibold text-sm hover:underline">
                          View →
                        </a>
                      </td>
                    </tr>

                    {/* Application Row 2 */}
                    <tr className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
                      <td className="py-4 px-4">
                        <a href="#" className="text-blue-600 font-semibold hover:underline">
                          Data Scientist Internship
                        </a>
                      </td>
                      <td className="py-4 px-4 text-gray-700">AI Frontier</td>
                      <td className="py-4 px-4 text-gray-600 text-sm">Oct 5, 2025</td>
                      <td className="py-4 px-4">
                        <span className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-semibold">
                          📅 Interview Scheduled
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <a href="#" className="text-blue-600 font-semibold text-sm hover:underline">
                          View →
                        </a>
                      </td>
                    </tr>

                    {/* Application Row 3 */}
                    <tr className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
                      <td className="py-4 px-4">
                        <a href="#" className="text-blue-600 font-semibold hover:underline">
                          Senior Full Stack Developer
                        </a>
                      </td>
                      <td className="py-4 px-4 text-gray-700">Tech Innovators Inc</td>
                      <td className="py-4 px-4 text-gray-600 text-sm">Sep 2, 2025</td>
                      <td className="py-4 px-4">
                        <span className="inline-flex items-center gap-2 bg-red-100 text-red-700 px-3 py-1 rounded-full text-xs font-semibold">
                          ✕ Rejected
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <a href="#" className="text-blue-600 font-semibold text-sm hover:underline">
                          View →
                        </a>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        </main>
      </div>

      <Footer />
    </div>
  )
}
