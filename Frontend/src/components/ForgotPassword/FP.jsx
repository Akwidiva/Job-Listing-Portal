import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./FP.css";
import axios from "axios";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const validateEmail = (email) => {
    const pattern = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
    return pattern.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      setError("Email is required");
      return;
    }

    if (!validateEmail(email)) {
      setError("Email must end with @gmail.com");
      return;
    }

    setError("");
    setLoading(true);

    try {
      const response = await axios.post(
        `http://localhost:5000/api/auth/forgot-password`,
        { email }
      );

      if (response.data.success) {
        setSuccess(true);
      }
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Failed to send reset link. Try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#1d1d36] flex justify-center items-center font-['Inter',sans-serif]">
      <div className="w-[380px] bg-white p-[35px_30px] rounded-[16px] shadow-[0_6px_35px_rgba(255,255,255,0.15)] border border-gray-200 text-center animate-fade-in">
      <h2 className="text-[26px] font-bold mb-[25px] tracking-[0.5px] text-black">Forgot Password</h2>

      {!success ? (
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            className="w-full p-3.5 bg-gray-100 border border-gray-300 rounded-[10px] text-base text-black outline-none transition-all duration-250 focus:bg-gray-200 focus:border-black"
            placeholder="Enter your Gmail address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          {error && <p className="text-red-500 text-sm mt-2.5 mb-[-5px] font-semibold">{error}</p>}

          <button className="w-full mt-4.5 p-3.5 bg-black text-white border-none rounded-[10px] text-base font-semibold cursor-pointer transition-all duration-300 hover:bg-gray-800 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed" disabled={loading}>
            {loading ? "Sending..." : "Send Reset Link"}
          </button>

          <Link className="inline-block mt-5 text-black text-sm no-underline font-semibold transition-opacity duration-300 hover:opacity-60" to="/login">
            ← Back to Login
          </Link>
        </form>
      ) : (
        <div className="animate-fade-in">
          <p className="text-lg font-bold text-green-600">✔ Reset link sent successfully!</p>
          <p className="mt-2 text-sm text-gray-600">
            Check your Gmail inbox for the password reset link.
          </p>

          <Link className="inline-block mt-5 text-black text-sm no-underline font-semibold transition-opacity duration-300 hover:opacity-60" to="/login">
            ← Back to Login
          </Link>
        </div>
      )}
      </div>
    </div>
  );
}

export default ForgotPassword;
