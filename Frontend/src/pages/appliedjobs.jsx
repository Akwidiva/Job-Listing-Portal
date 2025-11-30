import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import Header from "../components/header"
import Footer from "../components/footer"
import JobSeekerSidebar from "../components/jobseekersidebar"

export default function AppliedJobs() {
  const navigate = useNavigate()
  const [userName, setUserName] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [appliedJobs, setAppliedJobs] = useState([
    {
      id: 1,
      title: "Senior Full Stack Developer",
      company: "TechCorp Inc.",
      location: "San Francisco, CA",
      appliedDate: "2024-01-15",
      status: "Under Review",
      salary: "$120,000 - $150,000"
    },
    {
      id: 2,
      title: "Frontend Developer",
      company: "StartupXYZ",
      location: "Remote",
      appliedDate: "2024-01-10",
      status: "Interview Scheduled",
      salary: "$90,000 - $110,000"
    },
    {
      id: 3,
      title: "React Developer",
      company: "InnovateLabs",
      location: "New York, NY",
      appliedDate: "2024-01-08",
      status: "Rejected",
      salary: "$100,000 - $130,000"
    }
  ])

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

  const getStatusColor = (status) => {
    switch (status) {
      case "Under Review":
        return "bg-yellow-100 text-yellow-800"
      case "Interview Scheduled":
        return "bg-blue-100 text-blue-800"
      case "Rejected":
        return "bg-red-100 text-red-800"
      case "Accepted":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

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
          {/* Page Header */}
          <section className="bg-white px-8 py-6 border-b border-gray-200">
            <div className="flex items-center gap-2 mb-4 text-sm text-gray-600">
              <a href="/dashboard" className="text-blue-600 hover:underline">
                Dashboard
              </a>
              <span>›</span>
              <span>Applied Jobs</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-3xl">📋</span>
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">Applied Jobs</h1>
                  <p className="text-gray-600 text-sm">
                    Track the status of your job applications
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Applied Jobs Content */}
          <section className="px-8 py-8">
            {/* Search and Filters */}
            <div className="bg-white border border-gray-200 rounded-lg p-6 mb-8">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <input
                    type="text"
                    placeholder="Search applications..."
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div className="flex gap-2">
                  <select className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                    <option value="">All Status</option>
                    <option value="Under Review">Under Review</option>
                    <option value="Interview Scheduled">Interview Scheduled</option>
                    <option value="Rejected">Rejected</option>
                    <option value="Accepted">Accepted</option>
                  </select>
                  <select className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                    <option value="">All Locations</option>
                    <option value="San Francisco, CA">San Francisco, CA</option>
                    <option value="Remote">Remote</option>
                    <option value="New York, NY">New York, NY</option>
                  </select>
                  <button className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                    Search
                  </button>
                </div>
              </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">📄</span>
                  <div>
                    <p className="text-2xl font-bold text-gray-900">{appliedJobs.length}</p>
                    <p className="text-gray-600 text-sm">Total Applications</p>
                  </div>
                </div>
              </div>
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">⏳</span>
                  <div>
                    <p className="text-2xl font-bold text-gray-900">
                      {appliedJobs.filter(job => job.status === "Under Review").length}
                    </p>
                    <p className="text-gray-600 text-sm">Under Review</p>
                  </div>
                </div>
              </div>
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">🎯</span>
                  <div>
                    <p className="text-2xl font-bold text-gray-900">
                      {appliedJobs.filter(job => job.status === "Interview Scheduled").length}
                    </p>
                    <p className="text-gray-600 text-sm">Interviews</p>
                  </div>
                </div>
              </div>
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">✅</span>
                  <div>
                    <p className="text-2xl font-bold text-gray-900">
                      {appliedJobs.filter(job => job.status === "Accepted").length}
                    </p>
                    <p className="text-gray-600 text-sm">Accepted</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Jobs List */}
            <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-bold text-gray-900">Your Applications</h3>
              </div>

              <div className="divide-y divide-gray-200">
                {appliedJobs.map((job) => (
                  <div key={job.id} className="p-6 hover:bg-gray-50 transition-colors">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-start gap-4">
                          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                            <span className="text-xl">🏢</span>
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="text-lg font-semibold text-gray-900 mb-1">{job.title}</h4>
                            <p className="text-gray-600 mb-2">{job.company} • {job.location}</p>
                            <p className="text-gray-500 text-sm mb-3">{job.salary}</p>
                            <div className="flex items-center gap-4 text-sm text-gray-500">
                              <span>Applied on {new Date(job.appliedDate).toLocaleDateString()}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(job.status)}`}>
                          {job.status}
                        </span>
                        <button className="text-gray-400 hover:text-gray-600">
                          <span className="text-lg">⋯</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {appliedJobs.length === 0 && (
                <div className="p-12 text-center">
                  <span className="text-6xl mb-4 block">📋</span>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">No applications yet</h3>
                  <p className="text-gray-600 mb-6">Start applying to jobs to track your applications here.</p>
                  <button className="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                    Browse Jobs
                  </button>
                </div>
              )}
            </div>
          </section>
        </main>
      </div>

      <Footer />
    </div>
  )
}