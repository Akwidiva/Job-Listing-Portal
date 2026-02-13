import { useEffect, useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import Header from "../components/header"
import Footer from "../components/footer"
import EmployerSidebar from "../components/employersidebar"


export default function EmployerDashboard() {
  const navigate = useNavigate()
  const [companyName, setCompanyName] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [stats, setStats] = useState({ jobs: 0, applications: 0, pending: 0, hired: 0 })
  const [recentJobs, setRecentJobs] = useState([])
  const [recentApplications, setRecentApplications] = useState([])

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
      setCompanyName(userData.name || "Company")
    } catch {
      navigate("/login")
      return
    }

    const token = localStorage.getItem("token")
    // Fetch jobs posted by employer
    fetch("/api/jobs", { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => res.json())
      .then((data) => {
        setRecentJobs((data.jobs || []).slice(0, 5))
        setStats((s) => ({ ...s, jobs: data.total || (data.jobs || []).length }))
      })
      .catch(console.error)

    // Fetch applications for employer jobs
    fetch("/api/applications", { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => res.json())
      .then((data) => {
        const apps = data.applications || []
        setRecentApplications(apps.slice(0, 5))
        setStats((s) => ({
          ...s,
          applications: apps.length,
          pending: apps.filter((a) => a.status === "pending").length,
          hired: apps.filter((a) => a.status === "hired").length,
        }))
      })
      .catch(console.error)
      .finally(() => setIsLoading(false))
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
              <button
                onClick={() => navigate("/post-job")}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md font-medium transition-colors"
              >
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
                <p className="text-4xl font-bold text-gray-900 mb-2">{stats.jobs}</p>
                <p className="text-green-600 text-sm">Posted jobs</p>
              </div>

              {/* Total Applications */}
              <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-gray-600 font-semibold">Total Applications</h3>
                  <span className="text-2xl">👥</span>
                </div>
                <p className="text-4xl font-bold text-gray-900 mb-2">{stats.applications}</p>
                <p className="text-green-600 text-sm">Received applications</p>
              </div>

              {/* Pending Reviews */}
              <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-gray-600 font-semibold">Pending Reviews</h3>
                  <span className="text-2xl">⏳</span>
                </div>
                <p className="text-4xl font-bold text-gray-900 mb-2">{stats.pending}</p>
                <p className="text-red-600 text-sm">To review</p>
              </div>

              {/* Hired Candidates */}
              <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-gray-600 font-semibold">Hired Candidates</h3>
                  <span className="text-2xl">✓</span>
                </div>
                <p className="text-4xl font-bold text-gray-900 mb-2">{stats.hired}</p>
                <p className="text-green-600 text-sm">Hired</p>
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
                    {recentJobs.length === 0 ? (
                      <p className="text-gray-500 text-center py-8">No job listings yet. Post your first job!</p>
                    ) : (
                      recentJobs.map((job) => (
                        <div key={job._id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                          <div className="flex items-start justify-between mb-3">
                            <div>
                              <h3 className="text-lg font-bold text-gray-900">{job.title}</h3>
                              <p className="text-green-600 font-semibold text-xs mt-1">Active</p>
                            </div>
                            <div className="flex gap-2">
                              <Link to={`/jobs/${job._id}`} className="text-gray-600 hover:text-gray-900">👁️</Link>
                            </div>
                          </div>
                          <div className="text-gray-600 text-sm space-y-1">
                            <p>📍 {job.location || "Not specified"}</p>
                            <p>💼 {job.type || "Full-time"} • 💰 {job.salaryRange || "Competitive"}</p>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>

              {/* Quick Actions Sidebar */}
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-6">Quick Actions</h3>
                <div className="space-y-3">
                  <Link to="/post-job" className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-md font-medium transition-colors flex items-center justify-center gap-2">
                    + Post New Job
                  </Link>
                  <Link to="/employer-applications" className="w-full bg-white border border-gray-200 hover:bg-gray-50 text-gray-900 px-4 py-3 rounded-md font-medium transition-colors flex items-center gap-2">
                    📧 View Applications
                  </Link>
                  <Link to="/employer-company-profile" className="w-full bg-white border border-gray-200 hover:bg-gray-50 text-gray-900 px-4 py-3 rounded-md font-medium transition-colors flex items-center gap-2">
                    🏢 Company Profile
                  </Link>
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
                <Link to="/employer-applications" className="text-blue-600 font-semibold text-sm hover:underline">
                  View All →
                </Link>
              </div>

              {/* Application List */}
              <div className="space-y-4">
                {recentApplications.length === 0 ? (
                  <p className="text-gray-500 text-center py-8">No applications yet.</p>
                ) : (
                  recentApplications.map((app) => {
                    const initial = app.applicant?.name?.charAt(0)?.toUpperCase() || "?";
                    const statusColors = {
                      pending: "bg-blue-100 text-blue-600",
                      reviewing: "bg-purple-100 text-purple-600",
                      shortlisted: "bg-green-100 text-green-600",
                      rejected: "bg-red-100 text-red-600",
                      hired: "bg-emerald-100 text-emerald-600",
                    };
                    const colorClass = statusColors[app.status] || statusColors.pending;
                    return (
                      <div key={app._id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className={`w-10 h-10 ${colorClass.split(" ")[0]} rounded-full flex items-center justify-center font-bold ${colorClass.split(" ")[1]}`}>
                              {initial}
                            </div>
                            <div>
                              <p className="font-bold text-gray-900">{app.applicant?.name || "Unknown"}</p>
                              <p className="text-gray-600 text-sm">{app.job?.title || "Job position"}</p>
                              <p className="text-gray-500 text-xs">Applied {new Date(app.createdAt).toLocaleDateString()}</p>
                            </div>
                          </div>
                          <span className={`${colorClass} px-3 py-1 rounded-full text-xs font-semibold capitalize`}>
                            {app.status || "pending"}
                          </span>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          </section>
        </main>
      </div>

      <Footer />
    </div>
  )
}
