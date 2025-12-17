import React from "react";
import { Link } from "react-router-dom";
import Header from "../components/header";
import Footer from "../components/footer";

function Privacy() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />

      <main className="flex-1 px-6 py-12 max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">
          Privacy Policy
        </h1>

        <p className="text-gray-700 mb-4">
          Your privacy is important to us. This Privacy Policy explains how
          Skillora collects, uses, and protects your information.
        </p>

        <h2 className="text-xl font-semibold text-gray-900 mt-6 mb-2">
          1. Information We Collect
        </h2>
        <p className="text-gray-700 mb-4">
          We collect information such as your name, email address, and account
          details when you register or use our services.
        </p>

        <h2 className="text-xl font-semibold text-gray-900 mt-6 mb-2">
          2. How We Use Your Information
        </h2>
        <p className="text-gray-700 mb-4">
          Your information is used to provide and improve our services, manage
          accounts, and ensure platform security.
        </p>

        <h2 className="text-xl font-semibold text-gray-900 mt-6 mb-2">
          3. Data Security
        </h2>
        <p className="text-gray-700 mb-4">
          We implement reasonable security measures to protect your personal data,
          but no system is 100% secure.
        </p>

        <h2 className="text-xl font-semibold text-gray-900 mt-6 mb-2">
          4. Changes to This Policy
        </h2>
        <p className="text-gray-700 mb-4">
          This Privacy Policy may be updated periodically. Continued use of the
          platform means you accept those changes.
        </p>

        <Link
          to="/register"
          className="inline-block mt-8 text-blue-600 font-medium hover:underline"
        >
          ← Back to Registration
        </Link>
      </main>

      <Footer />
    </div>
  );
}

export default Privacy;
