import { useEffect, useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import Header from "../components/header"
import Footer from "../components/footer"
import EmployerSidebar from "../components/employersidebar"
import JobSeekerSidebar from "../components/jobseekersidebar"

export default function Settings() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  const [userType, setUserType] = useState("")
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState("")
  const [settings, setSettings] = useState({
    emailNotifications: true,
    applicationUpdates: true,
    marketingEmails: false,
    profileVisibility: "public",
  })

  useEffect(() => {
    const user = localStorage.getItem("user")
    if (!user) {
      navigate("/login")
      return
    }

    try {
      const userData = JSON.parse(user)
      setUserType(userData.userType)
    } catch (e) {
      navigate("/login")
    } finally {
      setLoading(false)
    }
  }, [navigate])

  const handleToggle = (key) => {
    setSettings((prev) => ({ ...prev, [key]: !prev[key] }))
  }

  const handleSave = () => {
    setSaving(true)
    // Simulate save
    setTimeout(() => {
      setMessage("Settings saved successfully!")
      setSaving(false)
    }, 500)
  }

  const handleLogout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    navigate("/login")
  }

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>
  }

  const Sidebar = userType === "employer" ? EmployerSidebar : JobSeekerSidebar

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 overflow-auto">
          <div className="p-8 max-w-4xl">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-sm mb-6">
              <Link to={userType === "employer" ? "/employer-dashboard" : "/dashboard"} className="text-gray-600 hover:text-blue-600">
                Dashboard
              </Link>
              <span className="text-gray-400">/</span>
              <span className="text-gray-900 font-medium">Settings</span>
            </div>

            {/* Page Title */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                <span>⚙️</span>
                Settings
              </h1>
              <p className="text-gray-600 mt-2">Manage your account settings and preferences</p>
            </div>

            {/* Success Message */}
            {message && (
              <div className="mb-6 p-4 rounded-lg bg-green-100 text-green-700">
                {message}
              </div>
            )}

            {/* Notification Settings */}
            <div className="bg-white rounded-lg border border-gray-200 p-8 mb-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-6 flex items-center gap-2">
                <span>🔔</span>
                Notification Settings
              </h2>

              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-900">Email Notifications</p>
                    <p className="text-sm text-gray-600">Receive email notifications for important updates</p>
                  </div>
                  <button
                    onClick={() => handleToggle("emailNotifications")}
                    className={`w-12 h-6 rounded-full transition-colors ${settings.emailNotifications ? "bg-blue-600" : "bg-gray-300"}`}
                  >
                    <div className={`w-5 h-5 bg-white rounded-full shadow transform transition-transform ${settings.emailNotifications ? "translate-x-6" : "translate-x-1"}`} />
                  </button>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-900">Application Updates</p>
                    <p className="text-sm text-gray-600">Get notified when your application status changes</p>
                  </div>
                  <button
                    onClick={() => handleToggle("applicationUpdates")}
                    className={`w-12 h-6 rounded-full transition-colors ${settings.applicationUpdates ? "bg-blue-600" : "bg-gray-300"}`}
                  >
                    <div className={`w-5 h-5 bg-white rounded-full shadow transform transition-transform ${settings.applicationUpdates ? "translate-x-6" : "translate-x-1"}`} />
                  </button>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-900">Marketing Emails</p>
                    <p className="text-sm text-gray-600">Receive tips, news, and promotional content</p>
                  </div>
                  <button
                    onClick={() => handleToggle("marketingEmails")}
                    className={`w-12 h-6 rounded-full transition-colors ${settings.marketingEmails ? "bg-blue-600" : "bg-gray-300"}`}
                  >
                    <div className={`w-5 h-5 bg-white rounded-full shadow transform transition-transform ${settings.marketingEmails ? "translate-x-6" : "translate-x-1"}`} />
                  </button>
                </div>
              </div>
            </div>

            {/* Privacy Settings */}
            <div className="bg-white rounded-lg border border-gray-200 p-8 mb-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-6 flex items-center gap-2">
                <span>🔒</span>
                Privacy Settings
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">Profile Visibility</label>
                  <select
                    value={settings.profileVisibility}
                    onChange={(e) => setSettings((prev) => ({ ...prev, profileVisibility: e.target.value }))}
                    className="w-full max-w-xs px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="public">Public - Anyone can view</option>
                    <option value="employers">Employers Only</option>
                    <option value="private">Private - Only you</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Account Actions */}
            <div className="bg-white rounded-lg border border-gray-200 p-8 mb-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-6 flex items-center gap-2">
                <span>👤</span>
                Account
              </h2>

              <div className="space-y-4">
                <button
                  onClick={handleLogout}
                  className="px-6 py-2 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg font-medium transition-colors"
                >
                  Log Out
                </button>
              </div>
            </div>

            {/* Save Button */}
            <div className="flex gap-4">
              <button
                onClick={handleSave}
                disabled={saving}
                className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-6 py-2 rounded-lg font-medium transition-colors"
              >
                {saving ? "Saving..." : "Save Settings"}
              </button>
            </div>
          </div>
        </main>
      </div>
      <Footer />
    </div>
  )
}
