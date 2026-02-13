import { useEffect, useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import Header from "../components/header"
import Footer from "../components/footer"
import EmployerSidebar from "../components/employersidebar"

export default function EditCompanyProfile() {
  const navigate = useNavigate()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState("")
  const [formData, setFormData] = useState({
    companyName: "",
    industry: "",
    companySize: "",
    companyDescription: "",
    website: "",
    location: "",
    founded: "",
  })

  useEffect(() => {
    const user = localStorage.getItem("user")
    const token = localStorage.getItem("token")
    if (!user || !token) {
      navigate("/login")
      return
    }

    try {
      const userData = JSON.parse(user)
      if (userData.userType !== "employer") {
        navigate("/dashboard")
        return
      }
      setIsAuthenticated(true)

      // Fetch current profile
      fetch("/api/employer/profile", {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.profile) {
            setFormData({
              companyName: data.profile.companyName || data.profile.name || "",
              industry: data.profile.industry || "",
              companySize: data.profile.companySize || "",
              companyDescription: data.profile.companyDescription || "",
              website: data.profile.website || "",
              location: data.profile.location || "",
              founded: data.profile.founded || "",
            })
          }
        })
        .catch((err) => console.error(err))
        .finally(() => setLoading(false))
    } catch (e) {
      navigate("/login")
    }
  }, [navigate])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSave = async () => {
    setSaving(true)
    setMessage("")
    const token = localStorage.getItem("token")
    try {
      const res = await fetch("/api/employer/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      })
      if (res.ok) {
        setMessage("Profile updated successfully!")
        setTimeout(() => navigate("/employer-company-profile"), 1500)
      } else {
        setMessage("Failed to update profile.")
      }
    } catch (err) {
      setMessage("Error updating profile.")
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>
  }

  if (!isAuthenticated) {
    return null
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />
      <div className="flex flex-1">
        <EmployerSidebar />
        <main className="flex-1 overflow-auto">
          <div className="p-8 max-w-4xl">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-sm mb-6">
              <Link to="/employer-dashboard" className="text-gray-600 hover:text-blue-600">
                Dashboard
              </Link>
              <span className="text-gray-400">/</span>
              <Link to="/employer-company-profile" className="text-gray-600 hover:text-blue-600">
                Profile Management
              </Link>
              <span className="text-gray-400">/</span>
              <span className="text-gray-900 font-medium">Edit Profile</span>
            </div>

            {/* Success/Error Message */}
            {message && (
              <div className={`mb-6 p-4 rounded-lg ${message.includes("success") ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                {message}
              </div>
            )}

            {/* Page Title */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                <span>🏢</span>
                Edit Company Profile
              </h1>
              <p className="text-gray-600 mt-2">Update your company information and contact details</p>
            </div>

            {/* Company Information Section */}
            <div className="bg-white rounded-lg border border-gray-200 p-8 mb-6">
              <div className="flex items-center gap-2 mb-6">
                <span className="text-blue-600">📋</span>
                <h2 className="text-lg font-semibold text-gray-900">Company Information</h2>
              </div>
              <p className="text-gray-600 text-sm mb-6">Update your company's basic details</p>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">Company Name</label>
                  <input
                    type="text"
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2">Industry</label>
                    <select
                      name="industry"
                      value={formData.industry}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">Select industry</option>
                      <option value="Technology">Technology</option>
                      <option value="Finance">Finance</option>
                      <option value="Healthcare">Healthcare</option>
                      <option value="Education">Education</option>
                      <option value="Retail">Retail</option>
                      <option value="Manufacturing">Manufacturing</option>
                      <option value="Consulting">Consulting</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2">Number of Employees</label>
                    <select
                      name="companySize"
                      value={formData.companySize}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">Select size</option>
                      <option value="1-10">1-10</option>
                      <option value="11-50">11-50</option>
                      <option value="51-200">51-200</option>
                      <option value="201-500">201-500</option>
                      <option value="500-1000">500-1000</option>
                      <option value="1000+">1000+</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2">Founded Year</label>
                    <input
                      type="text"
                      name="founded"
                      value={formData.founded}
                      onChange={handleChange}
                      placeholder="e.g., 2010"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2">Website</label>
                    <input
                      type="url"
                      name="website"
                      value={formData.website}
                      onChange={handleChange}
                      placeholder="https://example.com"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">Location / Address</label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    placeholder="123 Tech Street, San Francisco, CA"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">Company Description</label>
                  <textarea
                    name="companyDescription"
                    value={formData.companyDescription}
                    onChange={handleChange}
                    rows={4}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <p className="text-xs text-gray-500 mt-1">This will be displayed on your company profile</p>
                </div>

                <div className="flex gap-4 pt-4">
                  <button
                    onClick={handleSave}
                    disabled={saving}
                    className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-6 py-2 rounded-lg font-medium transition-colors"
                  >
                    {saving ? "Saving..." : "Save Changes"}
                  </button>
                  <Link
                    to="/employer-company-profile"
                    className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-6 py-2 rounded-lg font-medium transition-colors"
                  >
                    Cancel
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
      <Footer />
    </div>
  )
}
