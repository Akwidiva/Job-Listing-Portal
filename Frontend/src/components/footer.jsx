import { Link } from "react-router-dom"

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 py-6 mt-16">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between">
          {/* Logo and Branding */}
          <div className="flex items-center gap-2 mb-6 md:mb-0">
            <div className="w-6 h-6 bg-blue-600 rounded-md flex items-center justify-center">
              <span className="text-white font-bold text-xs">S</span>
            </div>
            <span className="text-sm font-bold text-gray-900">Skillora</span>
          </div>

          {/* Policy Links */}
          <div className="flex items-center gap-6 mb-6 md:mb-0">
            <Link to="/privacy" className="text-gray-600 hover:text-blue-600 text-sm transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="text-gray-600 hover:text-blue-600 text-sm transition-colors">
              Terms of Service
            </Link>
            <Link to="/cookies" className="text-gray-600 hover:text-blue-600 text-sm transition-colors">
              Cookie Policy
            </Link>
          </div>

          {/* Copyright */}
          <p className="text-gray-600 text-sm">© 2025 Skillora. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
