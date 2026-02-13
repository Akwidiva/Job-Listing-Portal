import { Search, MapPin, Clock, DollarSign, Users, Building2, Linkedin, Twitter, Facebook } from "lucide-react"
import { useState, useEffect } from "react"
import { useNavigate, Link } from "react-router-dom"
import Header from "../components/header"
import Footer from "../components/footer"

function LandingPage() {
  const navigate = useNavigate()
  const [keyword, setKeyword] = useState("")
  const [jobType, setJobType] = useState("")
  const [location, setLocation] = useState("")
  const [featuredJobs, setFeaturedJobs] = useState([])
  const [loadingJobs, setLoadingJobs] = useState(true)

  useEffect(() => {
    // Fetch featured jobs from API
    const fetchFeaturedJobs = async () => {
      try {
        const res = await fetch("/api/jobs?limit=6")
        const data = await res.json()
        setFeaturedJobs(data.jobs || [])
      } catch (err) {
        console.error("Failed to fetch featured jobs", err)
      } finally {
        setLoadingJobs(false)
      }
    }
    fetchFeaturedJobs()
  }, [])

  const handleSearch = (e) => {
    e.preventDefault()
    const params = new URLSearchParams()
    if (keyword) params.set("keyword", keyword)
    if (jobType) params.set("type", jobType)
    if (location) params.set("location", location)
    navigate(`/jobs?${params.toString()}`)
  }

  return (

    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-blue-50 to-white py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Find Your <span className="text-blue-600">Dream Job</span> Today
          </h1>
          <p className="text-gray-600 text-lg mb-12 max-w-2xl mx-auto">
            Discover thousands of job opportunities from top companies. Start your career journey with Skillora.
          </p>

          {/* Search Form */}
          <form onSubmit={handleSearch} className="bg-white rounded-lg shadow-lg p-8 mb-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="text-left">
                <label className="block text-sm font-semibold text-gray-900 mb-2">Job Title or Keyword</label>
                <input
                  type="text"
                  placeholder="e.g. Software Engineer, Product Manager"
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                />
              </div>
              <div className="text-left">
                <label className="block text-sm font-semibold text-gray-900 mb-2">Job Type</label>
                <select 
                  value={jobType}
                  onChange={(e) => setJobType(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-600 focus:border-transparent bg-white"
                >
                  <option value="">All Types</option>
                  <option value="Full-time">Full-time</option>
                  <option value="Part-time">Part-time</option>
                  <option value="Contract">Contract</option>
                  <option value="Internship">Internship</option>
                  <option value="Remote">Remote</option>
                </select>
              </div>
              <div className="text-left">
                <label className="block text-sm font-semibold text-gray-900 mb-2">Location</label>
                <select 
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-600 focus:border-transparent bg-white"
                >
                  <option value="">All Locations</option>
                  <option value="Remote">Remote</option>
                  <option value="New York">New York</option>
                  <option value="San Francisco">San Francisco</option>
                </select>
              </div>
            </div>
            <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white w-full md:w-auto px-8 py-2 rounded-md flex items-center justify-center mx-auto">
              <Search className="w-4 h-4 mr-2" />
              Search Jobs
            </button>
          </form>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="text-4xl font-bold text-blue-600 mb-2">5,000+</div>
              <p className="text-gray-600 font-medium">Active Jobs</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-blue-600 mb-2">2,000+</div>
              <p className="text-gray-600 font-medium">Companies</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-blue-600 mb-2">50,000+</div>
              <p className="text-gray-600 font-medium">Job Seekers</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Jobs Section */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Featured Job Opportunities</h2>
          <p className="text-gray-600">
            Explore some of the most exciting job openings from leading companies across various industries.
          </p>
        </div>

        {/* Job Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {loadingJobs ? (
            <p className="col-span-3 text-center text-gray-500">Loading jobs...</p>
          ) : featuredJobs.length === 0 ? (
            <p className="col-span-3 text-center text-gray-500">No jobs available yet.</p>
          ) : (
            featuredJobs.map((job) => (
            <div key={job._id} className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
              {/* Card Header with Icon */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-gray-900">{job.title}</h3>
                  <p className="text-sm text-gray-600 mt-1">{job.company}</p>
                </div>
                <div className="w-10 h-10 bg-gray-200 rounded-lg flex-shrink-0"></div>
              </div>

              {/* Job Details */}
              <div className="space-y-2 mb-4">
                <div className="flex items-center text-gray-600 text-sm">
                  <MapPin className="w-4 h-4 mr-2 text-gray-400" />
                  {job.location}
                </div>
                <div className="flex items-center text-gray-600 text-sm">
                  <Clock className="w-4 h-4 mr-2 text-gray-400" />
                  {job.type || "Full-time"}
                </div>
                <div className="flex items-center text-gray-600 text-sm">
                  <DollarSign className="w-4 h-4 mr-2 text-gray-400" />
                  {job.salaryRange || "Competitive"}
                </div>
              </div>

              {/* Job Description */}
              <p className="text-gray-700 text-sm mb-4 line-clamp-2">{job.description}</p>

              {/* Skills Tags */}
              <div className="flex flex-wrap gap-2 mb-6">
                {(job.qualifications || []).slice(0, 3).map((skill, idx) => (
                  <span key={idx} className="bg-green-100 text-green-700 text-xs font-semibold px-3 py-1 rounded-full">
                    {skill}
                  </span>
                ))}
              </div>

              {/* View Details Link */}
              <div className="text-center">
                <Link to={`/jobs/${job._id}`} className="text-blue-600 font-medium text-sm hover:underline">
                  View Details
                </Link>
              </div>
            </div>
          ))
          )}
        </div>

        {/* View All Jobs Button */}
        <div className="flex justify-center">
          <Link to="/jobs" className="bg-blue-600 hover:bg-blue-700 text-white px-12 py-2 font-semibold rounded-md">View All Jobs →</Link>
        </div>
      </section>

      {/* CTA Section - Job Seekers and Employers */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* For Job Seekers Card */}
          <div className="border border-gray-200 rounded-lg p-8 text-center hover:shadow-md transition-shadow">
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                <Users className="w-8 h-8 text-blue-600" />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">For Job Seekers</h3>
            <p className="text-gray-600 mb-8 leading-relaxed">
              Create your profile, upload your resume, and start applying to your dream jobs today.
            </p>
            <Link
              to="/register"
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-8 py-2 rounded-md font-semibold w-full mb-4 text-center transition-colors"
            >
              Get Started
            </Link>
            <Link to="/login" className="text-blue-600 font-medium text-sm hover:underline">
              Already have an account? Login
            </Link>
          </div>

          {/* For Employers Card */}
          <div className="border border-gray-200 rounded-lg p-8 text-center hover:shadow-md transition-shadow">
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                <Building2 className="w-8 h-8 text-green-600" />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">For Employers</h3>
            <p className="text-gray-600 mb-8 leading-relaxed">
              Post job listings, manage applications, and find the perfect candidates for your team.
            </p>
            <Link
              to="/register"
              className="inline-block bg-green-600 hover:bg-green-700 text-white px-8 py-2 rounded-md font-semibold w-full mb-4 text-center transition-colors"
            >
              Post a Job
            </Link>
            <Link to="/login" className="text-green-600 font-medium text-sm hover:underline">
              Employer Login
            </Link>
          </div>
        </div>
      </section>

      {/* Trusted by Industry Leaders */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <h3 className="text-2xl font-bold text-gray-900 text-center mb-12">Trusted by Industry Leaders</h3>
        <div className="flex flex-wrap justify-center items-center gap-12 md:gap-16">
          <div className="w-24 h-16 bg-gray-200 rounded-lg flex items-center justify-center text-gray-400 text-xs font-medium">
            Company 1
          </div>
          <div className="w-24 h-16 bg-gray-200 rounded-lg flex items-center justify-center text-gray-400 text-xs font-medium">
            Company 2
          </div>
          <div className="w-24 h-16 bg-gray-200 rounded-lg flex items-center justify-center text-gray-400 text-xs font-medium">
            Company 3
          </div>
          <div className="w-24 h-16 bg-gray-200 rounded-lg flex items-center justify-center text-gray-400 text-xs font-medium">
            Company 4
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}


export default LandingPage;