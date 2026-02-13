import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import Header from "../components/header"
import Footer from "../components/footer"
import EmployerSidebar from "../components/employersidebar"

export default function CreateJobListingPage() {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(true)
  const [formData, setFormData] = useState({
    jobTitle: "",
    jobDescription: "",
    location: "",
    jobType: "",
    applicationDeadline: "",
    qualifications: [""],
    responsibilities: [""],
    minSalary: "",
    maxSalary: "",
    salaryNegotiable: false,
  })

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
    } catch {
      navigate("/login")
      return
    }
    setIsLoading(false)
  }, [navigate])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: checked,
    }))
  }

  const handleAddQualification = () => {
    setFormData((prev) => ({
      ...prev,
      qualifications: [...prev.qualifications, ""],
    }))
  }

  const handleQualificationChange = (index, value) => {
    const newQualifications = [...formData.qualifications]
    newQualifications[index] = value
    setFormData((prev) => ({
      ...prev,
      qualifications: newQualifications,
    }))
  }

  const handleAddResponsibility = () => {
    setFormData((prev) => ({
      ...prev,
      responsibilities: [...prev.responsibilities, ""],
    }))
  }

  const handleResponsibilityChange = (index, value) => {
    const newResponsibilities = [...formData.responsibilities]
    newResponsibilities[index] = value
    setFormData((prev) => ({
      ...prev,
      responsibilities: newResponsibilities,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log("Job listing data:", formData)
    // TODO: Send data to backend API
    alert("Job listing submitted for review!")
  }

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
            <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
              <a href="/employer-dashboard" className="hover:text-blue-600">
                Dashboard
              </a>
              <span>/</span>
              <a href="/job-listings" className="hover:text-blue-600">
                Job Listings
              </a>
              <span>/</span>
              <span className="text-blue-600 font-medium">Create New Job</span>
            </div>
            <h1 className="text-3xl font-bold text-gray-900">Create New Job Listing</h1>
            <p className="text-gray-600 text-sm mt-2">
              Fill in the details below to create a new job posting. You'll be able to review and publish your listing
              after submission.
            </p>
          </section>

          {/* Form Content */}
          <form onSubmit={handleSubmit} className="px-8 py-6">
            <div className="max-w-4xl">
              {/* Basic Information Section */}
              <div className="bg-blue-50 border-l-4 border-blue-600 p-4 mb-8 rounded">
                <div className="flex items-start gap-3">
                  <div className="text-blue-600 text-lg mt-1">📋</div>
                  <div>
                    <h2 className="font-bold text-gray-900">Basic Information</h2>
                    <p className="text-gray-600 text-sm">Provide the fundamental details about the job position</p>
                  </div>
                </div>
              </div>

              {/* Job Title */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Job Title <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  name="jobTitle"
                  value={formData.jobTitle}
                  onChange={handleInputChange}
                  placeholder="e.g., Senior Backend Engineer"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                  required
                />
                <p className="text-gray-600 text-xs mt-1">The position title that will appear in job listings</p>
              </div>

              {/* Job Description */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Job Description <span className="text-red-600">*</span>
                </label>
                <textarea
                  name="jobDescription"
                  value={formData.jobDescription}
                  onChange={handleInputChange}
                  placeholder="Describe the role, team, and what makes this position unique..."
                  rows={6}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                  required
                />
                <p className="text-gray-600 text-xs mt-1">
                  Provide a comprehensive overview of the position (50-5000 characters)
                </p>
              </div>

              {/* Location and Job Type */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Location <span className="text-red-600">*</span>
                  </label>
                  <select
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                    required
                  >
                    <option value="">Select a location</option>
                    <option value="New York, NY">New York, NY</option>
                    <option value="San Francisco, CA">San Francisco, CA</option>
                    <option value="Austin, TX">Austin, TX</option>
                    <option value="Seattle, WA">Seattle, WA</option>
                    <option value="Remote">Remote</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Job Type <span className="text-red-600">*</span>
                  </label>
                  <select
                    name="jobType"
                    value={formData.jobType}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                    required
                  >
                    <option value="">Select job type</option>
                    <option value="Full-Time">Full-Time</option>
                    <option value="Part-Time">Part-Time</option>
                    <option value="Contract">Contract</option>
                    <option value="Internship">Internship</option>
                    <option value="Remote">Remote</option>
                  </select>
                </div>
              </div>

              {/* Application Deadline */}
              <div className="mb-8">
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Application Deadline <span className="text-red-600">*</span>
                </label>
                <input
                  type="date"
                  name="applicationDeadline"
                  value={formData.applicationDeadline}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                  required
                />
                <p className="text-gray-600 text-xs mt-1">
                  When will you stop accepting applications for this position?
                </p>
              </div>

              {/* Required Qualifications Section */}
              <div className="bg-blue-50 border-l-4 border-blue-600 p-4 mb-8 rounded">
                <div className="flex items-center justify-between">
                  <div className="flex items-start gap-3">
                    <div className="text-blue-600 text-lg">◯</div>
                    <div>
                      <h2 className="font-bold text-gray-900">Required Qualifications</h2>
                      <p className="text-gray-600 text-sm">
                        List the key qualifications and requirements for this position
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {formData.qualifications.map((qual, index) => (
                <div key={index} className="mb-4">
                  <input
                    type="text"
                    value={qual}
                    onChange={(e) => handleQualificationChange(index, e.target.value)}
                    placeholder={`e.g., 5+ years of experience with Node.js`}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>
              ))}
              <button
                type="button"
                onClick={handleAddQualification}
                className="text-blue-600 hover:text-blue-700 font-medium text-sm mb-8 flex items-center gap-2"
              >
                + Add Qualification
              </button>

              {/* Key Responsibilities Section */}
              <div className="bg-blue-50 border-l-4 border-blue-600 p-4 mb-8 rounded">
                <div className="flex items-center justify-between">
                  <div className="flex items-start gap-3">
                    <div className="text-blue-600 text-lg">📋</div>
                    <div>
                      <h2 className="font-bold text-gray-900">Key Responsibilities</h2>
                      <p className="text-gray-600 text-sm">
                        Outline the main duties and responsibilities for this role
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {formData.responsibilities.map((resp, index) => (
                <div key={index} className="mb-4">
                  <input
                    type="text"
                    value={resp}
                    onChange={(e) => handleResponsibilityChange(index, e.target.value)}
                    placeholder={`e.g., Design and implement backend APIs`}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>
              ))}
              <button
                type="button"
                onClick={handleAddResponsibility}
                className="text-blue-600 hover:text-blue-700 font-medium text-sm mb-8 flex items-center gap-2"
              >
                + Add Responsibility
              </button>

              {/* Compensation Section */}
              <div className="bg-blue-50 border-l-4 border-blue-600 p-4 mb-8 rounded">
                <div className="flex items-start gap-3">
                  <div className="text-blue-600 text-lg">💰</div>
                  <div>
                    <h2 className="font-bold text-gray-900">Compensation</h2>
                    <p className="text-gray-600 text-sm">Specify the salary range or mark as negotiable</p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">Minimum Salary (USD)</label>
                  <input
                    type="number"
                    name="minSalary"
                    value={formData.minSalary}
                    onChange={handleInputChange}
                    placeholder="e.g., 80000"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">Maximum Salary (USD)</label>
                  <input
                    type="number"
                    name="maxSalary"
                    value={formData.maxSalary}
                    onChange={handleInputChange}
                    placeholder="e.g., 120000"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>
              </div>

              <div className="mb-8">
                <label className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    name="salaryNegotiable"
                    checked={formData.salaryNegotiable}
                    onChange={handleCheckboxChange}
                    className="w-4 h-4 border border-gray-300 rounded focus:ring-2 focus:ring-blue-600"
                  />
                  <span className="text-gray-900 font-medium">Salary is negotiable</span>
                </label>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 justify-end pt-6 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() => navigate("/job-listings")}
                  className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center gap-2"
                >
                  Submit for Review
                </button>
              </div>
            </div>
          </form>
        </main>
      </div>

      <Footer />
    </div>
  )
}
