import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import Header from "../components/header"
import Footer from "../components/footer"
import JobSeekerSidebar from "../components/jobseekersidebar"

export default function Jobseekerprofile() {
   const navigate = useNavigate()
  const [userName, setUserName] = useState("")
  const [isLoading, setIsLoading] = useState(true)

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
    setIsLoading(false)
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
          {/* Page Header */}
          <section className="bg-white px-8 py-6 border-b border-gray-200">
            <div className="flex items-center gap-2 mb-4 text-sm text-gray-600">
              <a href="/dashboard" className="text-blue-600 hover:underline">
                Dashboard
              </a>
              <span>›</span>
              <span>My Profile</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-3xl">👤</span>
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">My Profile</h1>
                  <p className="text-gray-600 text-sm">
                    Manage your personal information, resumes, and career preferences
                  </p>
                </div>
              </div>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold text-sm hover:bg-blue-700 transition-colors">
                ✏️ Edit Profile
              </button>
            </div>
          </section>

          {/* Profile Content */}
          <section className="px-8 py-8">
            {/* Profile Header Card */}
            <div className="bg-white border border-gray-200 rounded-lg p-6 mb-8 flex items-start gap-6">
              <div className="w-32 h-32 bg-gray-300 rounded-lg flex-shrink-0 flex items-center justify-center">
                <img src="/professional-profile-avatar.png" alt="Profile" className="w-full h-full object-cover rounded-lg" />
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">{userName}</h2>
                <div className="space-y-1 text-sm text-gray-600 mb-4">
                  <p>📧 john.doe@example.com</p>
                  <p>📞 +1 (555) 123-4567</p>
                  <p>📍 San Francisco, CA</p>
                </div>
                <p className="text-gray-700 mb-4">
                  Experienced full-stack developer with 5+ years in web development. Passionate about building scalable
                  applications and mentoring junior developers.
                </p>
                <div className="flex gap-4">
                  <div className="bg-blue-50 px-4 py-2 rounded-lg">
                    <p className="text-xs text-gray-600">Applications</p>
                    <p className="text-xl font-bold text-gray-900">12</p>
                  </div>
                  <div className="bg-green-50 px-4 py-2 rounded-lg">
                    <p className="text-xs text-gray-600">Profile Status</p>
                    <p className="text-xl font-bold text-green-600">Active</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Profile Completeness */}
            <div className="bg-white border border-gray-200 rounded-lg p-6 mb-8">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Profile Completeness</h3>
              <p className="text-gray-600 text-sm mb-4">Your profile is 85% complete</p>
              <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
                <div className="bg-blue-600 h-3 rounded-full" style={{ width: "85%" }}></div>
              </div>
              <p className="text-gray-600 text-xs">
                Complete your profile to increase visibility to employers and improve your chances of getting hired.
              </p>
            </div>

            {/* Personal Information */}
            <div className="bg-white border border-gray-200 rounded-lg p-6 mb-8">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-lg font-bold text-gray-900">Personal Information</h3>
                  <p className="text-gray-600 text-sm">Your basic profile details</p>
                </div>
                <button className="text-blue-600 font-semibold text-sm hover:underline">✏️ Edit</button>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="text-sm font-semibold text-gray-600 mb-2 block">👤 First Name</label>
                  <input
                    type="text"
                    value="John"
                    disabled
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-900 bg-gray-50 text-sm"
                  />
                </div>
                <div>
                  <label className="text-sm font-semibold text-gray-600 mb-2 block">👤 Last Name</label>
                  <input
                    type="text"
                    value="Doe"
                    disabled
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-900 bg-gray-50 text-sm"
                  />
                </div>
                <div>
                  <label className="text-sm font-semibold text-gray-600 mb-2 block">📧 Email</label>
                  <input
                    type="email"
                    value="john.doe@example.com"
                    disabled
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-900 bg-gray-50 text-sm"
                  />
                </div>
                <div>
                  <label className="text-sm font-semibold text-gray-600 mb-2 block">📞 Phone</label>
                  <input
                    type="tel"
                    value="+1 (555) 123-4567"
                    disabled
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-900 bg-gray-50 text-sm"
                  />
                </div>
                <div className="col-span-2">
                  <label className="text-sm font-semibold text-gray-600 mb-2 block">📍 Location</label>
                  <input
                    type="text"
                    value="San Francisco, CA"
                    disabled
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-900 bg-gray-50 text-sm"
                  />
                </div>
              </div>
            </div>

           

            {/* Bio Section */}
            <div className="bg-white border border-gray-200 rounded-lg p-6 mb-8">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-gray-900">📝 Bio</h3>
                <button className="text-blue-600 font-semibold text-sm hover:underline">✏️ Edit</button>
              </div>
              <p className="text-gray-700 bg-gray-50 border border-gray-200 rounded-lg p-4 text-sm">
                Experienced full-stack developer with 5+ years in web development. Passionate about building scalable
                applications and mentoring junior developers.
              </p>
            </div>

            {/* Career Preferences */}
            <div className="bg-white border border-gray-200 rounded-lg p-6 mb-8">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-lg font-bold text-gray-900">Career Preferences</h3>
                  <p className="text-gray-600 text-sm">Your job search preferences and goals</p>
                </div>
                <button className="text-blue-600 font-semibold text-sm hover:underline">✏️ Edit</button>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="text-sm font-semibold text-gray-600 mb-3 block">💼 Job Types</label>
                  <div className="flex gap-2 flex-wrap">
                    <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-semibold">
                      Full Stack
                    </span>
                    <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-semibold">
                      Consultant
                    </span>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-semibold text-gray-600 mb-3 block">🏢 Industries</label>
                  <div className="flex gap-2 flex-wrap">
                    <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-xs font-semibold">
                      Technology
                    </span>
                    <span className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-xs font-semibold">
                      Finance
                    </span>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-semibold text-gray-600 mb-3 block">🌍 Work Arrangement</label>
                  <p className="text-gray-700 text-sm">Remote</p>
                </div>

                <div>
                  <label className="text-sm font-semibold text-gray-600 mb-3 block">💰 Salary Expectation</label>
                  <p className="text-gray-700 text-sm">$120,000 - $150,000</p>
                </div>

                <div>
                  <label className="text-sm font-semibold text-gray-600 mb-3 block">🎯 Career Goals</label>
                  <p className="text-gray-700 text-sm">Become a technical lead and architect scalable systems</p>
                </div>
              </div>
            </div>

            {/* Resumes */}
            <div className="bg-white border border-gray-200 rounded-lg p-6 mb-8">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-lg font-bold text-gray-900">Resumes</h3>
                  <p className="text-gray-600 text-sm">Manage your resume files</p>
                </div>
                <button onClick={() => navigate("/resume")} className="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold text-sm hover:bg-blue-700 transition-colors">
                  + Manage Resumes
                </button>
              </div>

              <div className="space-y-3">
                {/* Resume Item 1 */}
                <div className="flex items-center justify-between bg-gray-50 border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">📄</span>
                    <div>
                      <p className="font-semibold text-gray-900 text-sm">John_Doe_Resume_2024.pdf</p>
                      <p className="text-gray-600 text-xs">Jan 15, 2024 • 245 KB</p>
                    </div>
                    <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs font-semibold">Default</span>
                  </div>
                  <div className="flex gap-2">
                    <button className="text-gray-600 hover:text-gray-900">⬇️</button>
                    <button className="text-gray-600 hover:text-gray-900">👁️</button>
                  </div>
                </div>

                {/* Resume Item 2 */}
                <div className="flex items-center justify-between bg-gray-50 border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">📄</span>
                    <div>
                      <p className="font-semibold text-gray-900 text-sm">John_Doe_Resume_Technical.pdf</p>
                      <p className="text-gray-600 text-xs">Nov 20, 2023 • 198 KB</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button className="text-gray-600 hover:text-gray-900">⬇️</button>
                    <button className="text-gray-600 hover:text-gray-900">👁️</button>
                  </div>
                </div>
              </div>
            </div>

             {/* Contact Details */}
            <div className="bg-white border border-gray-200 rounded-lg p-6 mb-8">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-lg font-bold text-gray-900">Contact Details</h3>
                  <p className="text-gray-600 text-sm">Your contact information and social profiles</p>
                </div>
                <button className="text-blue-600 font-semibold text-sm hover:underline">✏️ Edit</button>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="text-sm font-semibold text-gray-600 mb-2 block">📧 Email Address</label>
                  <input
                    type="email"
                    value="john.doe@example.com"
                    disabled
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-900 bg-gray-50 text-sm"
                  />
                </div>
                <div>
                  <label className="text-sm font-semibold text-gray-600 mb-2 block">📞 Phone</label>
                  <input
                    type="tel"
                    value="+1 (555) 123-4567"
                    disabled
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-900 bg-gray-50 text-sm"
                  />
                </div>
                <div>
                  <label className="text-sm font-semibold text-gray-600 mb-2 block">🔗 LinkedIn Profile</label>
                  <a href="#" className="text-blue-600 hover:underline text-sm">
                    View Profile
                  </a>
                </div>
                <div>
                  <label className="text-sm font-semibold text-gray-600 mb-2 block">🌐 Portfolio Website</label>
                  <a href="#" className="text-blue-600 hover:underline text-sm">
                    Visit Website
                  </a>
                </div>
                <div className="col-span-2">
                  <label className="text-sm font-semibold text-gray-600 mb-2 block">💻 GitHub Repository</label>
                  <a href="#" className="text-blue-600 hover:underline text-sm">
                    View Repository
                  </a>
                </div>
              </div>
            </div>
            
            {/* Quick Actions */}
            <div className="bg-white border border-gray-200 rounded-lg p-6 mb-8">
              <h3 className="text-lg font-bold text-gray-900 mb-6">Quick Actions</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <button className="flex items-center justify-center gap-2 border border-gray-300 rounded-lg p-4 hover:bg-gray-50 transition-colors text-gray-700 font-semibold text-sm">
                  📋 View Applied Jobs
                </button>
                <button className="flex items-center justify-center gap-2 border border-gray-300 rounded-lg p-4 hover:bg-gray-50 transition-colors text-gray-700 font-semibold text-sm">
                  🔍 Find Jobs
                </button>
                <button className="flex items-center justify-center gap-2 border border-gray-300 rounded-lg p-4 hover:bg-gray-50 transition-colors text-gray-700 font-semibold text-sm">
                  📊 Back to Dashboard
                </button>
              </div>
            </div>
          </section>
        </main>
      </div>

      <Footer />
    </div>
  )
}
