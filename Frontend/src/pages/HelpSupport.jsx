import { useEffect, useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import Header from "../components/header"
import Footer from "../components/footer"
import EmployerSidebar from "../components/employersidebar"
import JobSeekerSidebar from "../components/jobseekersidebar"

export default function HelpSupport() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  const [userType, setUserType] = useState("")
  const [expandedFaq, setExpandedFaq] = useState(null)

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

  const faqs = [
    {
      question: "How do I apply for a job?",
      answer: "Navigate to the Jobs page, find a job you're interested in, click on it to view details, and click the 'Apply Now' button. Make sure your profile and resume are up to date before applying."
    },
    {
      question: "How do I upload my resume?",
      answer: "Go to your Dashboard and click on 'Resume Management' or navigate to the Profile section. You can upload PDF, DOC, or DOCX files up to 5MB."
    },
    {
      question: "How do I post a job listing?",
      answer: "As an employer, go to your Employer Dashboard and click 'Post New Job'. Fill in the job details including title, description, requirements, and salary range, then submit."
    },
    {
      question: "How do I track my applications?",
      answer: "Visit the 'Applied Jobs' section in your dashboard to see all your submitted applications and their current status."
    },
    {
      question: "How do I update my profile?",
      answer: "Click on 'Profile Management' in your sidebar to edit your personal information, skills, experience, and contact details."
    },
    {
      question: "How do I change my password?",
      answer: "Currently, you can reset your password by logging out and using the 'Forgot Password' link on the login page."
    },
  ]

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
              <span className="text-gray-900 font-medium">Help & Support</span>
            </div>

            {/* Page Title */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                <span>❓</span>
                Help & Support
              </h1>
              <p className="text-gray-600 mt-2">Find answers to common questions and get help</p>
            </div>

            {/* Quick Help Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white rounded-lg border border-gray-200 p-6 text-center hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">📧</span>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Email Support</h3>
                <p className="text-sm text-gray-600 mb-4">Get help via email</p>
                <a href="mailto:support@jobportal.com" className="text-blue-600 text-sm font-medium hover:underline">
                  support@jobportal.com
                </a>
              </div>

              <div className="bg-white rounded-lg border border-gray-200 p-6 text-center hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">💬</span>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Live Chat</h3>
                <p className="text-sm text-gray-600 mb-4">Chat with our team</p>
                <button className="text-green-600 text-sm font-medium hover:underline">
                  Start Chat
                </button>
              </div>

              <div className="bg-white rounded-lg border border-gray-200 p-6 text-center hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">📚</span>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Documentation</h3>
                <p className="text-sm text-gray-600 mb-4">Browse our guides</p>
                <button className="text-purple-600 text-sm font-medium hover:underline">
                  View Docs
                </button>
              </div>
            </div>

            {/* FAQ Section */}
            <div className="bg-white rounded-lg border border-gray-200 p-8">
              <h2 className="text-lg font-semibold text-gray-900 mb-6 flex items-center gap-2">
                <span>📋</span>
                Frequently Asked Questions
              </h2>

              <div className="space-y-4">
                {faqs.map((faq, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg">
                    <button
                      onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                      className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 transition-colors"
                    >
                      <span className="font-medium text-gray-900">{faq.question}</span>
                      <span className="text-gray-400 text-xl">
                        {expandedFaq === index ? "−" : "+"}
                      </span>
                    </button>
                    {expandedFaq === index && (
                      <div className="px-4 pb-4 text-gray-600">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-white rounded-lg border border-gray-200 p-8 mt-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-6 flex items-center gap-2">
                <span>✉️</span>
                Contact Us
              </h2>
              <p className="text-gray-600 text-sm mb-6">Can't find what you're looking for? Send us a message.</p>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">Subject</label>
                  <input
                    type="text"
                    placeholder="How can we help?"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">Message</label>
                  <textarea
                    rows={4}
                    placeholder="Describe your issue or question..."
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors">
                  Send Message
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
      <Footer />
    </div>
  )
}
