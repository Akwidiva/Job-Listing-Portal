import { Link } from 'react-router-dom'
import Header from '../components/header'
import Footer from '../components/footer'

function AuthPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 py-12">
        {/* Title Section */}
        <div className="text-center mb-12">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-8 h-8 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z" />
            </svg>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-3">Skillora</h1>
          <p className="text-gray-600">
            Welcome to Skillora - Your gateway to career opportunities and talent discovery
          </p>
        </div>

        {/* Two Card Section */}
        <div className="w-full max-w-4xl grid md:grid-cols-2 gap-6 mb-12">
          {/* Existing User Card */}
          <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-8">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                <path d="M11 7h2v2h-2zm0 4h2v6h-2zm1-9C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
              </svg>
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">Existing User?</h2>
            <p className="text-gray-700 text-sm mb-4">
              Log in to your Skillora account to access your dashboard, manage applications, or post job listings.
            </p>

            <div className="bg-white rounded-lg p-4 mb-6">
              <p className="text-gray-900 font-semibold text-sm mb-3">What you can do:</p>
              <ul className="space-y-2">
                <li className="flex items-center gap-2 text-gray-700 text-sm">
                  <span className="text-blue-600 font-bold">✓</span> Access your dashboard
                </li>
                <li className="flex items-center gap-2 text-gray-700 text-sm">
                  <span className="text-blue-600 font-bold">✓</span> View applications
                </li>
                <li className="flex items-center gap-2 text-gray-700 text-sm">
                  <span className="text-blue-600 font-bold">✓</span> Manage job listings
                </li>
                <li className="flex items-center gap-2 text-gray-700 text-sm">
                  <span className="text-blue-600 font-bold">✓</span> Update your profile
                </li>
              </ul>
            </div>

            <Link
              to="/login"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              Log In <span>→</span>
            </Link>
          </div>

          {/* New User Card */}
          <div className="bg-green-50 border-2 border-green-200 rounded-lg p-8">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
              </svg>
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">New to Skillora?</h2>
            <p className="text-gray-700 text-sm mb-4">
              Create a new account to start your journey. Whether you're a job seeker or employer, we have the right
              tools for you.
            </p>

            <div className="bg-white rounded-lg p-4 mb-6">
              <p className="text-gray-900 font-semibold text-sm mb-3">What you can do:</p>
              <ul className="space-y-2">
                <li className="flex items-center gap-2 text-gray-700 text-sm">
                  <span className="text-green-600 font-bold">✓</span> Create your profile
                </li>
                <li className="flex items-center gap-2 text-gray-700 text-sm">
                  <span className="text-green-600 font-bold">✓</span> Search for jobs
                </li>
                <li className="flex items-center gap-2 text-gray-700 text-sm">
                  <span className="text-green-600 font-bold">✓</span> Post job listings
                </li>
                <li className="flex items-center gap-2 text-gray-700 text-sm">
                  <span className="text-green-600 font-bold">✓</span> Connect with opportunities
                </li>
              </ul>
            </div>

            <Link
              to="/register"
              className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              Sign Up <span>→</span>
            </Link>
          </div>
        </div>

        {/* Features Section */}
        <div className="w-full max-w-4xl grid md:grid-cols-3 gap-6 mb-12">
          {/* Feature 1 */}
          <div className="text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
              </svg>
            </div>
            <h3 className="font-bold text-gray-900 mb-2">For Job Seekers</h3>
            <p className="text-sm text-gray-600">
              Discover thousands of job opportunities and advance your career with Skillora.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="text-center">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
              </svg>
            </div>
            <h3 className="font-bold text-gray-900 mb-2">For Employers</h3>
            <p className="text-sm text-gray-600">
              Find and hire top talent. Post jobs and manage applications effortlessly.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="text-center">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-purple-600" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z" />
              </svg>
            </div>
            <h3 className="font-bold text-gray-900 mb-2">Secure & Trusted</h3>
            <p className="text-sm text-gray-600">Your data is protected with industry-leading security standards.</p>
          </div>
        </div>

        {/* Help Section */}
        <div className="text-center text-sm text-gray-600 mb-8">
          Need help? Check out our{" "}
          <Link to="/faq" className="text-blue-600 hover:text-blue-700 font-semibold">
            FAQ
          </Link>{" "}
          or{" "}
          <Link to="/contact" className="text-blue-600 hover:text-blue-700 font-semibold">
            contact support
          </Link>
        </div>
      </div>

      <Footer />
    </div>
  )
}
export default AuthPage;
  