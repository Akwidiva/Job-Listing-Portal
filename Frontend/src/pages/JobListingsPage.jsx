import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import Header from "../components/header"
import Footer from "../components/footer"
import EmployerSidebar from "../components/employersidebar"

export default function JobListingsPage() {
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
      
      if (userData.userType !== "employer") {
        navigate("/dashboard")
        return
      }
    } catch (err) {
      navigate("/login")
      return
    }
    
    setIsLoading(false)
  }, [navigate])

  if (isLoading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>
  }

  const jobListings = [
    {
      id: 1,
      title: "Senior Backend Engineer (Node.js)",
      location: "San Francisco, CA",
      type: "Full-Time",
      status: "Active",
      applications: 42,
      posted: "Nov 20, 2025",
    },
    {
      id: 2,
      title: "Digital Marketing Manager",
      location: "Remote (US)",
      type: "Remote",
      status: "Active",
      applications: 15,
      posted: "Nov 15, 2025",
    },
    {
      id: 3,
      title: "Data Scientist Internship",
      location: "Austin, TX",
      type: "Internship",
      status: "Active",
      applications: 68,
      posted: "Oct 1, 2025",
    },
    {
      id: 4,
      title: "Customer Support Specialist",
      location: "New York, NY",
      type: "Full-Time",
      status: "Paused",
      applications: 20,
      posted: "Nov 10, 2025",
    },
    {
      id: 5,
      title: "Senior Full Stack Developer",
      location: "Seattle, WA",
      type: "Full-Time",
      status: "Closed",
      applications: 55,
      posted: "Sep 1, 2025",
    },
  ]

  const getStatusColor = (status) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-700"
      case "Paused":
        return "bg-yellow-100 text-yellow-700"
      case "Closed":
        return "bg-red-100 text-red-700"
      default:
        return "bg-gray-100 text-gray-700"
    }
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
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <a href="/employer-dashboard" className="hover:text-blue-600">
                  Dashboard
                </a>
                <span>/</span>
                <span className="text-blue-600 font-medium">Job Listings</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Job Listings</h1>
                <p className="text-gray-600 text-sm mt-1">Manage all your job postings and track applications</p>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => navigate("/employer-dashboard")}
                  className="text-blue-600 hover:text-blue-700 font-medium text-sm flex items-center gap-1"
                >
                  ← Back to Dashboard
                </button>
                <button
                  onClick={() => navigate("/create-job-listing")}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md font-medium transition-colors"
                >
                  + Create New Job
                </button>
              </div>
            </div>
          </section>

          {/* Total Listings Badge */}
          <section className="px-8 py-4">
            <div className="inline-flex items-center gap-2">
              <span className="text-sm text-gray-600">Total listings:</span>
              <span className="text-lg font-bold text-gray-900">5</span>
              <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs font-semibold">Dev</span>
            </div>
          </section>

          {/* Job Listings Table */}
          <section className="px-8 py-6">
            <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-bold text-gray-900">Your Job Postings</h2>
                <p className="text-gray-600 text-sm mt-1">View, edit, or delete your job listings</p>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                        Job Title
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                        Location
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                        Type
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                        Applications
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                        Posted
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {jobListings.map((job) => (
                      <tr key={job.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <button className="text-blue-600 hover:underline font-medium">
                            {job.title}
                          </button>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-gray-600 text-sm">{job.location}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-gray-600 text-sm">{job.type}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(job.status)}`}
                          >
                            {job.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-gray-600 text-sm">{job.applications}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-gray-600 text-sm">{job.posted}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-gray-600">
                          <button className="text-gray-400 hover:text-gray-600">⋮</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          {/* Statistics Cards */}
          <section className="px-8 py-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Active Listings */}
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="text-gray-600 text-sm font-semibold mb-2">Active Listings</h3>
                <p className="text-4xl font-bold text-gray-900">3</p>
                <p className="text-gray-600 text-xs mt-2">Currently recruiting</p>
              </div>

              {/* Total Applications */}
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="text-gray-600 text-sm font-semibold mb-2">Total Applications</h3>
                <p className="text-4xl font-bold text-gray-900">240</p>
                <p className="text-gray-600 text-xs mt-2">Across all listings</p>
              </div>

              {/* Closed Listings */}
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="text-gray-600 text-sm font-semibold mb-2">Closed Listings</h3>
                <p className="text-4xl font-bold text-gray-900">1</p>
                <p className="text-gray-600 text-xs mt-2">No longer accepting applications</p>
              </div>
            </div>
          </section>
        </main>
      </div>

      <Footer />
    </div>
  )
}
