import React, { useState, useEffect } from "react";
import "./ResetPassword.css";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";

function ResetPassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [tokenValid, setTokenValid] = useState(false);
  const [verifying, setVerifying] = useState(true);
  
  const { token } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const verifyToken = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/auth/verify-reset-token/${token}`
        );
        
        if (response.data.success) {
          setTokenValid(true);
        }
      } catch (error) {
        setError(
          error.response?.data?.message || 
          "Invalid or expired reset token"
        );
        setTokenValid(false);
      } finally {
        setVerifying(false);
      }
    };

    if (token) {
      verifyToken();
    } else {
      setError("No reset token provided");
      setVerifying(false);
    }
  }, [token]);

  const validatePassword = (password) => {
    const strongPassword =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return strongPassword.test(password);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    // Validation
    if (!password) {
      setError("Password is required");
      return;
    }

    if (!validatePassword(password)) {
      setError(
        "Password must be 8+ characters and include uppercase, lowercase, number & special character"
      );
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(
        `http://localhost:5000/api/auth/reset-password/${token}`,
        { password }
      );

      if (response.data.success) {
        setMessage("Password reset successfully! Redirecting to login...");
        
        setTimeout(() => {
          navigate("/");
        }, 2000);
      }
    } catch (error) {
      setError(
        error.response?.data?.message || 
        "An error occurred while resetting password"
      );
    } finally {
      setLoading(false);
    }
  };

  if (verifying) {
    return (
      <div style={styles.container}>
        <h2 style={styles.heading}>Verifying Reset Link</h2>
        <p style={styles.infoText}>Please wait while we verify your reset link...</p>
      </div>
    );
  }

  if (!tokenValid) {
    return (
      <div style={styles.container}>
        <h2 style={styles.heading}>Invalid Reset Link</h2>
        <p style={styles.errorText}>{error}</p>
        
        <div style={styles.linkContainer}>
          <Link to="/FP" style={styles.link}>
            Request New Reset Link
          </Link>
          <Link to="/" style={styles.link}>
            Back to Registration
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Reset Your Password</h2>
      
      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.inputGroup}>
          <label style={styles.label}>New Password</label>
          <input
            type="password"
            placeholder="Enter new password"
            style={styles.input}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div style={styles.inputGroup}>
          <label style={styles.label}>Confirm Password</label>
          <input
            type="password"
            placeholder="Confirm new password"
            style={styles.input}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>

        {message && <p style={styles.successText}>{message}</p>}
        {error && <p style={styles.errorText}>{error}</p>}

        <button 
          type="submit" 
          style={styles.button}
          disabled={loading}
        >
          {loading ? "Resetting..." : "Reset Password"}
        </button>

        <Link to="/" style={styles.backLink}>
          ← Back to Registration
        </Link>
      </form>
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
  inputGroup: {
    textAlign: "left",
  },
  label: {
    display: "block",
    marginBottom: "5px",
    fontWeight: "bold",
    color: "#333",
  },
  input: {
    width: "100%",
    padding: "12px",
    fontSize: "16px",
    border: "1px solid #ddd",
    borderRadius: "5px",
    outline: "none",
    boxSizing: "border-box",
  },
  button: {
    padding: "12px",
    fontSize: "16px",
    background: "#007bff",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    marginTop: "10px",
  },
  successText: {
    color: "green",
    fontSize: "14px",
    margin: "0",
  },
  errorText: {
    color: "red",
    fontSize: "14px",
    margin: "0",
  },
  infoText: {
    color: "#666",
    fontSize: "14px",
  },
  linkContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    marginTop: "20px",
  },
  link: {
    color: "#007bff",
    textDecoration: "none",
    fontSize: "16px",
  },
  backLink: {
    color: "#007bff",
    textDecoration: "none",
    fontSize: "16px",
    marginTop: "15px",
    display: "inline-block",
  },
};

export default ResetPassword;