import { useEffect, useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import Header from "../components/header"
import Footer from "../components/footer"
import EmployerSidebar from "../components/employersidebar"

export default function EmployerCompanyProfile() {
  const navigate = useNavigate()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loading, setLoading] = useState(true)
  const [profile, setProfile] = useState({
    companyName: '',
    companyDescription: '',
    industry: '',
    companySize: '',
    founded: '',
    website: '',
    location: '',
    brandColor: '#1B82F6',
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

      // Fetch employer profile
      fetch("/api/employer/profile", {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.profile) {
            setProfile({
              companyName: data.profile.companyName || data.profile.name || '',
              companyDescription: data.profile.companyDescription || '',
              industry: data.profile.industry || '',
              companySize: data.profile.companySize || '',
              founded: data.profile.founded || '',
              website: data.profile.website || '',
              location: data.profile.location || '',
              brandColor: data.profile.brandColor || '#1B82F6',
            })
          }
        })
        .catch((err) => console.error(err))
        .finally(() => setLoading(false))
    } catch (e) {
      navigate("/login")
    }
  }, [navigate])

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
          <div className="p-8 max-w-6xl">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-sm mb-6">
              <Link to="/employer-dashboard" className="text-gray-600 hover:text-blue-600">
                Dashboard
              </Link>
              <span className="text-gray-400">/</span>
              <span className="text-gray-900 font-medium">Profile Management</span>
            </div>

            {/* Page Title */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                <span className="text-2xl">🏢</span>
                Company Profile Management
              </h1>
              <p className="text-gray-600 mt-2">Manage your company's profile information and branding</p>
            </div>

            {/* Profile Overview Section */}
            <div className="bg-white rounded-lg border border-gray-200 mb-8 overflow-hidden">
              <div className="h-48" style={{ background: `linear-gradient(to right, ${profile.brandColor}, ${profile.brandColor}dd)` }} />
              <div className="px-8 pb-8">
                <div className="flex justify-between items-start -mt-20 relative z-10 mb-6">
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold text-gray-900 mb-1">{profile.companyName || "Company Name"}</h2>
                    <p className="text-gray-600 mb-4">{profile.location || "Location not set"}</p>
                    <p className="text-gray-700 max-w-2xl">
                      {profile.companyDescription || "No company description provided yet."}
                    </p>
                    <div className="flex gap-8 mt-6 pt-6 border-t border-gray-200">
                      <div>
                        <p className="text-sm text-gray-600">Founded</p>
                        <p className="text-lg font-semibold text-gray-900">{profile.founded || "N/A"}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Employees</p>
                        <p className="text-lg font-semibold text-gray-900">{profile.companySize || "N/A"}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Industry</p>
                        <p className="text-lg font-semibold text-gray-900">{profile.industry || "N/A"}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Brand Color</p>
                        <div className="flex items-center gap-2 mt-1">
                          <div className="w-6 h-6 rounded border border-gray-200" style={{ backgroundColor: profile.brandColor }} />
                          <span className="text-gray-900 font-medium">{profile.brandColor}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  {profile.industry && (
                    <div className="bg-blue-100 rounded-lg px-3 py-1 text-blue-700 text-sm font-medium h-fit">
                      {profile.industry}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-lg border border-gray-200 p-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center gap-2">
                <span>⚡</span>
                Quick Actions
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Link
                  to="/edit-company-profile"
                  className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors group"
                >
                  <div>
                    <h4 className="font-semibold text-gray-900 group-hover:text-blue-600">Edit Profile</h4>
                    <p className="text-sm text-gray-600">Update company information, contact details and description</p>
                  </div>
                  <span className="text-xl">→</span>
                </Link>

                <Link
                  to="/company-branding"
                  className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors group"
                >
                  <div>
                    <h4 className="font-semibold text-gray-900 group-hover:text-blue-600">Company Branding</h4>
                    <p className="text-sm text-gray-600">Customize logo, image and brand colors</p>
                  </div>
                  <span className="text-xl">→</span>
                </Link>
              </div>
            </div>
          </div>
        </main>
      </div>
      <Footer />
    </div>
  )
}
