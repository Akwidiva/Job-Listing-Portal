import React, { useState } from "react";
import { Link } from "react-router-dom";
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
      setError("Email must be a valid Gmail address (example@gmail.com)");
      return;
    }

    setError("");
    setLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:5001/api/auth/forgot-password",
        { email }
      );

      if (response.data.success) {
        setSuccess(true);
      }
    } catch (error) {
      console.error("Forgot password error:", error);
      setError(
        error.response?.data?.message || 
        "Failed to send reset link. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Forgot Password</h2>

      {!success ? (
        <form onSubmit={handleSubmit} style={styles.form}>
          <input
            type="email"
            placeholder="Enter your Gmail"
            style={styles.input}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          {/* Error message */}
          {error && <p style={styles.errorText}>{error}</p>}

          <button 
            type="submit" 
            style={styles.button}
            disabled={loading}
          >
            {loading ? "Sending..." : "Send Reset Link"}
          </button>

          <Link to="/" style={styles.backLink}>
            ← Back to Registration
          </Link>
        </form>
      ) : (
        <div style={styles.messageBox}>
          <p style={styles.successText}>
            ✔ Reset link sent successfully!
          </p>
          <p style={styles.infoText}>
            Check your email for the password reset link. 
            The link will expire in 1 hour.
          </p>
          
          <Link to="/" style={styles.backLink}>
            ← Back to Registration
          </Link>
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    width: "350px",
    margin: "80px auto",
    padding: "20px",
    textAlign: "center",
    border: "1px solid #ddd",
    borderRadius: "10px",
    background: "#fff",
    boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
  },
  heading: {
    marginBottom: "20px",
    color: "#333",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },
  input: {
    padding: "12px",
    fontSize: "16px",
    border: "1px solid #ddd",
    borderRadius: "5px",
    outline: "none",
  },
  errorText: {
    color: "red",
    fontSize: "14px",
    margin: "0",
  },
  button: {
    padding: "12px",
    fontSize: "16px",
    background: "#007bff",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  messageBox: {
    marginTop: "20px",
  },
  successText: {
    fontSize: "18px",
    color: "green",
    marginBottom: "10px",
    fontWeight: "bold",
  },
  infoText: {
    fontSize: "14px",
    color: "#666",
    marginBottom: "20px",
  },
  backLink: {
    color: "#007bff",
    textDecoration: "none",
    fontSize: "16px",
    marginTop: "15px",
    display: "inline-block",
  },
};

export default ForgotPassword;