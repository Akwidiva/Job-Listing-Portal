import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import Header from "../components/header"
import Footer from "../components/footer"
import EmployerSidebar from "../components/employersidebar"

export default function EmployerDashboard() {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const user = localStorage.getItem("user")
    if (!user) {
      navigate("/login")
      return
    }
    try {
      const userData = JSON.parse(user)
      if (userData.userType !== 'employer') {
        navigate("/dashboard")
        return
      }
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
          {/* Page Header */}
          <section className="bg-white px-8 py-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-3xl">📊</span>
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">Employer Dashboard</h1>
                  <p className="text-gray-600 text-sm">
                    Manage your job postings and track applications
                  </p>
                </div>
              </div>
              <button className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                + Post New Job
              </button>
            </div>
          </section>

          {/* Dashboard Content */}
          <section className="px-8 py-8">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">💼</span>
                  <div>
                    <p className="text-2xl font-bold text-gray-900">12</p>
                    <p className="text-gray-600 text-sm">Active Jobs</p>
                  </div>
                </div>
              </div>
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">👥</span>
                  <div>
                    <p className="text-2xl font-bold text-gray-900">48</p>
                    <p className="text-gray-600 text-sm">Total Applications</p>
                  </div>
                </div>
              </div>
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">📈</span>
                  <div>
                    <p className="text-2xl font-bold text-gray-900">156</p>
                    <p className="text-gray-600 text-sm">Profile Views</p>
                  </div>
                </div>
              </div>
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">⭐</span>
                  <div>
                    <p className="text-2xl font-bold text-gray-900">4.8</p>
                    <p className="text-gray-600 text-sm">Average Rating</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Jobs */}
            <div className="bg-white border border-gray-200 rounded-lg p-6 mb-8">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-gray-900">Recent Job Postings</h3>
                <a href="/manage-jobs" className="text-blue-600 hover:text-blue-700 font-semibold text-sm">
                  View All
                </a>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div>
                    <h4 className="font-semibold text-gray-900">Senior Full Stack Developer</h4>
                    <p className="text-gray-600 text-sm">Posted 2 days ago • 12 applications</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-semibold">
                      Active
                    </span>
                    <button className="text-gray-400 hover:text-gray-600">⋯</button>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div>
                    <h4 className="font-semibold text-gray-900">UX/UI Designer</h4>
                    <p className="text-gray-600 text-sm">Posted 1 week ago • 8 applications</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-semibold">
                      Active
                    </span>
                    <button className="text-gray-400 hover:text-gray-600">⋯</button>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Applications */}
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-gray-900">Recent Applications</h3>
                <a href="/applications" className="text-blue-600 hover:text-blue-700 font-semibold text-sm">
                  View All
                </a>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-blue-600 font-semibold text-sm">JD</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">John Doe</h4>
                      <p className="text-gray-600 text-sm">Applied to Senior Full Stack Developer</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-yellow-600 text-sm">New</span>
                    <button className="bg-blue-600 text-white px-4 py-2 rounded text-sm font-semibold hover:bg-blue-700">
                      Review
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                      <span className="text-green-600 font-semibold text-sm">SM</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Sarah Miller</h4>
                      <p className="text-gray-600 text-sm">Applied to UX/UI Designer</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-gray-600 text-sm">Reviewed</span>
                    <button className="bg-gray-600 text-white px-4 py-2 rounded text-sm font-semibold hover:bg-gray-700">
                      View
                    </button>
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