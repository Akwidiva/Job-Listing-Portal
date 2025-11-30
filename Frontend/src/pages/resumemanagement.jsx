import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import Header from "../components/header"
import Footer from "../components/footer"
import JobSeekerSidebar from "../components/jobseekersidebar"

export default function ResumeManagement() {
  const navigate = useNavigate()
  const [userName, setUserName] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [resumes, setResumes] = useState([
    { id: 1, name: "John_Doe_Resume_2024.pdf", size: "245 KB", date: "Jan 15, 2024", isDefault: true },
    { id: 2, name: "John_Doe_Resume_Technical.pdf", size: "198 KB", date: "Nov 20, 2023", isDefault: false }
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
              <span>Resume Management</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-3xl">📄</span>
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">Resume Management</h1>
                  <p className="text-gray-600 text-sm">
                    Upload, organize, and manage your resume files
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Resume Management Content */}
          <section className="px-8 py-8">
            {/* Upload Section */}
            <div className="bg-white border border-gray-200 rounded-lg p-6 mb-8">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Upload New Resume</h3>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                <div className="mb-4">
                  <span className="text-4xl">📎</span>
                </div>
                <p className="text-gray-600 mb-4">Drag and drop your resume file here, or click to browse</p>
                <input type="file" accept=".pdf,.doc,.docx" className="hidden" id="resume-upload" />
                <label htmlFor="resume-upload" className="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold text-sm hover:bg-blue-700 transition-colors cursor-pointer">
                  Browse Files
                </label>
                <p className="text-xs text-gray-500 mt-2">Supported formats: PDF, DOC, DOCX (Max 10MB)</p>
              </div>
            </div>

            {/* Resume List */}
            <div className="bg-white border border-gray-200 rounded-lg p-6 mb-8">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-lg font-bold text-gray-900">Your Resumes</h3>
                  <p className="text-gray-600 text-sm">Manage your uploaded resume files</p>
                </div>
              </div>

              <div className="space-y-3">
                {resumes.map((resume) => (
                  <div key={resume.id} className="flex items-center justify-between bg-gray-50 border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">📄</span>
                      <div>
                        <p className="font-semibold text-gray-900 text-sm">{resume.name}</p>
                        <p className="text-gray-600 text-xs">{resume.date} • {resume.size}</p>
                      </div>
                      {resume.isDefault && (
                        <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs font-semibold">Default</span>
                      )}
                    </div>
                    <div className="flex gap-2">
                      <button className="text-gray-600 hover:text-gray-900">⬇️</button>
                      <button className="text-gray-600 hover:text-gray-900">👁️</button>
                      <button className="text-gray-600 hover:text-gray-900">🗑️</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Resume Tips */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
              <h3 className="text-lg font-bold text-blue-900 mb-4">Resume Tips</h3>
              <ul className="text-blue-800 text-sm space-y-2">
                <li>• Keep your resume to 1-2 pages</li>
                <li>• Use a clean, professional format</li>
                <li>• Tailor your resume for each job application</li>
                <li>• Include relevant keywords from the job description</li>
                <li>• Proofread carefully for errors</li>
              </ul>
            </div>
          </section>
        </main>
      </div>

      <Footer />
    </div>
  )
}