import { useEffect, useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import Header from '../components/header'
import Footer from '../components/footer'
import JobSeekerSidebar from "../components/jobseekersidebar"

export default function Dashboard() {
  const navigate = useNavigate()
  const [userName, setUserName] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [stats, setStats] = useState({ total: 0, pending: 0, shortlisted: 0 })
  const [recentApps, setRecentApps] = useState([])

  useEffect(() => {
    const user = localStorage.getItem("user")
    if (!user) {
      navigate("/login")
      return
    }
    try {
      const userData = JSON.parse(user)
      setUserName(userData.name || userData.email.split('@')[0] || "User")
    } catch {
      navigate("/login")
      return
    }

    // Fetch applications
    const token = localStorage.getItem("token")
    fetch("/api/applications", { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => res.json())
      .then((data) => {
        const apps = data.applications || []
        setStats({
          total: apps.length,
          pending: apps.filter((a) => a.status === "pending" || a.status === "reviewed").length,
          shortlisted: apps.filter((a) => a.status === "shortlisted").length,
        })
        setRecentApps(apps.slice(0, 5))
      })
      .catch((err) => console.error(err))
      .finally(() => setIsLoading(false))
  }, [navigate])

  if (isLoading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />

      <div className="flex flex-1">
        <JobSeekerSidebar />

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
              <div
                className="bg-blue-600 text-white rounded-lg p-6 hover:shadow-lg transition-shadow cursor-pointer"
                onClick={() => navigate("/jobs")}
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="text-3xl">🔍</span>
                </div>
                <h3 className="text-xl font-bold mb-2">Search Jobs</h3>
                <p className="text-blue-100 text-sm">Find new job opportunities</p>
              </div>

              {/* Manage Profile Card */}
              <div
                className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow cursor-pointer"
                onClick={() => navigate("/profile-management")}
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="text-3xl">👤</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Manage Profile</h3>
                <p className="text-gray-600 text-sm">Update your profile information</p>
              </div>

              {/* Resume Management Card */}
              <div
                className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow cursor-pointer"
                onClick={() => navigate("/resume")}
              >
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
                <p className="text-4xl font-bold text-gray-900 mb-2">{stats.total}</p>
                <p className="text-gray-600 text-sm">Job applications submitted</p>
              </div>

              {/* Under Review */}
              <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-gray-600 font-semibold">Under Review</h3>
                  <span className="text-2xl">⏳</span>
                </div>
                <p className="text-4xl font-bold text-gray-900 mb-2">{stats.pending}</p>
                <p className="text-gray-600 text-sm">Applications being reviewed</p>
              </div>

              {/* Interviewing */}
              <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-gray-600 font-semibold">Interviewing</h3>
                  <span className="text-2xl">👥</span>
                </div>
                <p className="text-4xl font-bold text-gray-900 mb-2">{stats.shortlisted}</p>
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
                <Link to="/applied-jobs" className="text-blue-600 font-semibold text-sm hover:underline">
                  View All →
                </Link>
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
                    {recentApps.length === 0 ? (
                      <tr>
                        <td colSpan="5" className="py-8 text-center text-gray-500">
                          No applications yet. Start applying to jobs!
                        </td>
                      </tr>
                    ) : (
                      recentApps.map((app) => {
                        const statusConfig = {
                          pending: { bg: "bg-yellow-100", text: "text-yellow-700", icon: "⏳", label: "Pending" },
                          reviewing: { bg: "bg-green-100", text: "text-green-700", icon: "✓", label: "Under Review" },
                          shortlisted: { bg: "bg-blue-100", text: "text-blue-700", icon: "📅", label: "Shortlisted" },
                          rejected: { bg: "bg-red-100", text: "text-red-700", icon: "✕", label: "Rejected" },
                          hired: { bg: "bg-emerald-100", text: "text-emerald-700", icon: "🎉", label: "Hired" },
                        };
                        const status = statusConfig[app.status] || statusConfig.pending;
                        return (
                          <tr key={app._id} className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
                            <td className="py-4 px-4">
                              <a href={`/jobs/${app.job?._id}`} className="text-blue-600 font-semibold hover:underline">
                                {app.job?.title || "Job Position"}
                              </a>
                            </td>
                            <td className="py-4 px-4 text-gray-700">{app.job?.company || "Company"}</td>
                            <td className="py-4 px-4 text-gray-600 text-sm">
                              {new Date(app.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                            </td>
                            <td className="py-4 px-4">
                              <span className={`inline-flex items-center gap-2 ${status.bg} ${status.text} px-3 py-1 rounded-full text-xs font-semibold`}>
                                {status.icon} {status.label}
                              </span>
                            </td>
                            <td className="py-4 px-4">
                              <a href={`/jobs/${app.job?._id}`} className="text-blue-600 font-semibold text-sm hover:underline">
                                View →
                              </a>
                            </td>
                          </tr>
                        );
                      })
                    )}
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
