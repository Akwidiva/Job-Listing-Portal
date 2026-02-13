import { useEffect, useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import Header from "../components/header"
import Footer from "../components/footer"
import EmployerSidebar from "../components/employersidebar"

export default function CompanyBranding() {
  const navigate = useNavigate()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState("")
  const [brandData, setBrandData] = useState({
    primaryColor: "#1B82F6",
    secondaryColor: "#10B981",
    accentColor: "#FCD34D",
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

      // Fetch current brand color
      fetch("/api/employer/profile", {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.profile?.brandColor) {
            setBrandData((prev) => ({ ...prev, primaryColor: data.profile.brandColor }))
          }
        })
        .catch((err) => console.error(err))
        .finally(() => setLoading(false))
    } catch (e) {
      navigate("/login")
    }
  }, [navigate])

  const handleColorChange = (colorKey, value) => {
    setBrandData((prev) => ({
      ...prev,
      [colorKey]: value,
    }))
  }

  const handleSaveBranding = async () => {
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
        body: JSON.stringify({ brandColor: brandData.primaryColor }),
      })
      if (res.ok) {
        setMessage("Branding saved successfully!")
      } else {
        setMessage("Failed to save branding.")
      }
    } catch (err) {
      setMessage("Error saving branding.")
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
          <div className="p-8 max-w-6xl">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-sm mb-6">
              <Link to="/employer-dashboard" className="text-gray-600 hover:text-blue-600">
                Dashboard
              </Link>
              <span className="text-gray-400">/</span>
              <Link to="/employer-company-profile" className="text-gray-600 hover:text-blue-600">
                Company Profile
              </Link>
              <span className="text-gray-400">/</span>
              <span className="text-gray-900 font-medium">Branding Settings</span>
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
                <span>🎨</span>
                Company Branding Settings
              </h1>
              <p className="text-gray-600 mt-2">Customize your company's visual identity with logo and brand colors</p>
            </div>

            <div className="grid grid-cols-3 gap-8">
              {/* Left Column - Branding Controls */}
              <div className="col-span-2 space-y-6">
                {/* Logo Upload Section */}
                <div className="bg-white rounded-lg border border-gray-200 p-8">
                  <h2 className="text-lg font-semibold text-gray-900 mb-6 flex items-center gap-2">
                    <span>🖼️</span>
                    Customize Your Branding
                  </h2>
                  <p className="text-gray-600 text-sm mb-6">
                    Upload your company logo and select brand colors that represent your company identity
                  </p>

                  {/* Logo Section */}
                  <div className="mb-8">
                    <label className="block text-sm font-medium text-gray-900 mb-2">Company Logo</label>
                    <p className="text-gray-600 text-xs mb-4">
                      Upload a logo that represents your company. Recommended size: 200x200px
                    </p>

                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center bg-gray-50 mb-4">
                      <div className="w-24 h-24 bg-white border border-gray-200 rounded-lg mx-auto mb-4 flex items-center justify-center">
                        <span className="text-3xl">🏢</span>
                      </div>
                      <p className="text-gray-600 text-sm font-medium mb-2">Logo Preview</p>
                      <p className="text-gray-500 text-xs">Click to change or remove</p>
                    </div>

                    <div className="flex gap-3">
                      <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-900 rounded-lg text-sm font-medium transition-colors">
                        <span>⬇️</span>
                        Change Logo
                      </button>
                      <button className="flex items-center gap-2 px-4 py-2 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg text-sm font-medium transition-colors">
                        <span>🗑️</span>
                        Remove
                      </button>
                    </div>
                  </div>

                  {/* Brand Colors Section */}
                  <div className="pt-8 border-t border-gray-200">
                    <h3 className="font-semibold text-gray-900 mb-6">Brand Colors</h3>
                    <p className="text-gray-600 text-sm mb-6">Choose colors that represent your brand identity</p>

                    {/* Primary Color */}
                    <div className="mb-8">
                      <label className="block text-sm font-medium text-gray-900 mb-2">Primary Color</label>
                      <p className="text-gray-600 text-xs mb-3">Main brand color used for buttons and highlights</p>
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-3">
                          <input
                            type="color"
                            value={brandData.primaryColor}
                            onChange={(e) => handleColorChange("primaryColor", e.target.value)}
                            className="w-12 h-12 rounded cursor-pointer"
                          />
                          <div>
                            <label className="block text-xs text-gray-600 mb-1">Select Color</label>
                            <input
                              type="text"
                              value={brandData.primaryColor}
                              onChange={(e) => handleColorChange("primaryColor", e.target.value)}
                              className="w-32 px-3 py-2 border border-gray-300 rounded text-sm font-mono"
                            />
                          </div>
                        </div>
                        <span className="text-gray-600">{brandData.primaryColor}</span>
                      </div>
                    </div>

                    {/* Secondary Color */}
                    <div className="mb-8">
                      <label className="block text-sm font-medium text-gray-900 mb-2">Secondary Color</label>
                      <p className="text-gray-600 text-xs mb-3">Supporting brand color for accents</p>
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-3">
                          <input
                            type="color"
                            value={brandData.secondaryColor}
                            onChange={(e) => handleColorChange("secondaryColor", e.target.value)}
                            className="w-12 h-12 rounded cursor-pointer"
                          />
                          <div>
                            <label className="block text-xs text-gray-600 mb-1">Select Color</label>
                            <input
                              type="text"
                              value={brandData.secondaryColor}
                              onChange={(e) => handleColorChange("secondaryColor", e.target.value)}
                              className="w-32 px-3 py-2 border border-gray-300 rounded text-sm font-mono"
                            />
                          </div>
                        </div>
                        <span className="text-gray-600">{brandData.secondaryColor}</span>
                      </div>
                    </div>

                    {/* Accent Color */}
                    <div>
                      <label className="block text-sm font-medium text-gray-900 mb-2">Accent Color</label>
                      <p className="text-gray-600 text-xs mb-3">Accent color for additional highlights</p>
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-3">
                          <input
                            type="color"
                            value={brandData.accentColor}
                            onChange={(e) => handleColorChange("accentColor", e.target.value)}
                            className="w-12 h-12 rounded cursor-pointer"
                          />
                          <div>
                            <label className="block text-xs text-gray-600 mb-1">Select Color</label>
                            <input
                              type="text"
                              value={brandData.accentColor}
                              onChange={(e) => handleColorChange("accentColor", e.target.value)}
                              className="w-32 px-3 py-2 border border-gray-300 rounded text-sm font-mono"
                            />
                          </div>
                        </div>
                        <span className="text-gray-600">{brandData.accentColor}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Save Button */}
                <div className="flex gap-4">
                  <button
                    onClick={handleSaveBranding}
                    disabled={saving}
                    className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-6 py-2 rounded-lg font-medium transition-colors flex items-center gap-2"
                  >
                    <span>💾</span>
                    {saving ? "Saving..." : "Save Branding"}
                  </button>
                  <Link
                    to="/employer-company-profile"
                    className="border border-gray-300 text-gray-700 hover:bg-gray-50 px-6 py-2 rounded-lg font-medium transition-colors"
                  >
                    Cancel
                  </Link>
                </div>
              </div>

              {/* Right Column - Preview */}
              <div className="col-span-1">
                <div className="bg-white rounded-lg border border-gray-200 p-6 sticky top-8">
                  <h3 className="font-semibold text-gray-900 mb-2">Preview</h3>
                  <p className="text-gray-600 text-xs mb-6">How your branding will appear</p>

                  {/* Logo Preview */}
                  <div className="mb-6">
                    <p className="text-xs font-medium text-gray-600 mb-3">LOGO</p>
                    <div className="bg-gray-100 rounded-lg p-4 text-center mb-4">
                      <div className="w-20 h-20 bg-white border border-gray-300 rounded mx-auto flex items-center justify-center">
                        <span className="text-2xl">🏢</span>
                      </div>
                    </div>
                  </div>

                  {/* Color Palette */}
                  <div className="mb-6">
                    <p className="text-xs font-medium text-gray-600 mb-3">COLOR PALETTE</p>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <div
                          className="w-6 h-6 rounded border border-gray-200"
                          style={{ backgroundColor: brandData.primaryColor }}
                        />
                        <span className="text-xs text-gray-600">Primary</span>
                        <span className="text-xs font-mono text-gray-900 ml-auto">{brandData.primaryColor}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div
                          className="w-6 h-6 rounded border border-gray-200"
                          style={{ backgroundColor: brandData.secondaryColor }}
                        />
                        <span className="text-xs text-gray-600">Secondary</span>
                        <span className="text-xs font-mono text-gray-900 ml-auto">{brandData.secondaryColor}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div
                          className="w-6 h-6 rounded border border-gray-200"
                          style={{ backgroundColor: brandData.accentColor }}
                        />
                        <span className="text-xs text-gray-600">Accent</span>
                        <span className="text-xs font-mono text-gray-900 ml-auto">{brandData.accentColor}</span>
                      </div>
                    </div>
                  </div>

                  {/* Button Preview */}
                  <div>
                    <p className="text-xs font-medium text-gray-600 mb-3">BUTTON PREVIEW</p>
                    <div className="space-y-2">
                      <button
                        style={{ backgroundColor: brandData.primaryColor }}
                        className="w-full text-white px-4 py-2 rounded font-medium text-sm"
                      >
                        Primary Button
                      </button>
                      <button
                        style={{ borderColor: brandData.secondaryColor, color: brandData.secondaryColor }}
                        className="w-full border-2 px-4 py-2 rounded font-medium text-sm"
                      >
                        Secondary Button
                      </button>
                    </div>
                  </div>

                  {/* Job Listing Preview */}
                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <p className="text-xs font-medium text-gray-600 mb-3">JOB LISTING PREVIEW</p>
                    <div className="border border-gray-200 rounded p-3 text-xs">
                      <p className="font-semibold text-gray-900 mb-1">TechCorp Solutions</p>
                      <p className="text-gray-600 text-xs mb-2">Senior Developer</p>
                      <p className="text-gray-600 text-xs">
                        We're looking for an experienced developer to join our growing team...
                      </p>
                      <div className="flex gap-1 mt-2">
                        <span
                          style={{ backgroundColor: brandData.primaryColor }}
                          className="text-white text-xs px-2 py-1 rounded"
                        >
                          Full-time
                        </span>
                        <span
                          style={{ backgroundColor: brandData.secondaryColor }}
                          className="text-white text-xs px-2 py-1 rounded"
                        >
                          Remote
                        </span>
                      </div>
                    </div>
                  </div>
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
 