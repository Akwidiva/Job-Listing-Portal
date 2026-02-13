import React from "react";
import { Link } from "react-router-dom";
import Header from "../components/header";
import Footer from "../components/footer";

function Terms() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />

      <main className="flex-1 px-6 py-12 max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">
          Terms of Service
        </h1>

        <p className="text-gray-700 mb-4">
          Welcome to <strong>Skillora</strong>. By accessing or using our platform,
          you agree to comply with and be bound by these Terms of Service.
        </p>

        <h2 className="text-xl font-semibold text-gray-900 mt-6 mb-2">
          1. Use of the Platform
        </h2>
        <p className="text-gray-700 mb-4">
          You agree to use Skillora only for lawful purposes. You must not misuse,
          disrupt, or attempt to gain unauthorized access to the platform.
        </p>

        <h2 className="text-xl font-semibold text-gray-900 mt-6 mb-2">
          2. Account Responsibility
        </h2>
        <p className="text-gray-700 mb-4">
          You are responsible for maintaining the confidentiality of your account
          credentials and for all activities that occur under your account.
        </p>

        <h2 className="text-xl font-semibold text-gray-900 mt-6 mb-2">
          3. Termination
        </h2>
        <p className="text-gray-700 mb-4">
          We reserve the right to suspend or terminate accounts that violate these
          terms without prior notice.
        </p>

        <h2 className="text-xl font-semibold text-gray-900 mt-6 mb-2">
          4. Changes to Terms
        </h2>
        <p className="text-gray-700 mb-4">
          Skillora may update these Terms of Service at any time. Continued use of
          the platform indicates acceptance of the updated terms.
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

export default Terms;
