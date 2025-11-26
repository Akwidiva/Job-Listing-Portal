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
        "http://localhost:5000/api/auth/forgot-password",
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
    <div className="fp-container fadeIn">
      <h2 className="fp-title">Forgot Password</h2>

      {!success ? (
        <form className="fp-form" onSubmit={handleSubmit}>
          <input
            type="email"
            className="fp-input"
            placeholder="Enter your Gmail address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          {error && <p className="fp-error">{error}</p>}

          <button className="fp-btn" disabled={loading}>
            {loading ? "Sending..." : "Send Reset Link"}
          </button>

          <Link className="fp-back" to="/login">
            ← Back to Login
          </Link>
        </form>
      ) : (
        <div className="fp-success fadeIn">
          <p className="fp-success-text">✔ Reset link sent successfully!</p>
          <p className="fp-info-text">
            Check your Gmail inbox for the password reset link.
          </p>

          <Link className="fp-back" to="/login">
            ← Back to Login
          </Link>
        </div>
      )}
    </div>
  );
}

export default ForgotPassword;
