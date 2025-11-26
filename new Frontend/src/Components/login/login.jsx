import React, { useState } from "react";
import "./login.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [serverError, setServerError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleLogin = async () => {
    if (!email || !password) {
      setServerError("Email & Password required");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password,
      });

      localStorage.setItem("token", response.data.token);

      setSuccessMessage("Login successful...");
      setTimeout(() => navigate("/dashboard"), 1500);
    } catch (error) {
      setServerError(error.response?.data?.message || "Login failed");
    }
  };

  // GOOGLE BUTTON CLICK -> Redirect to registration or OAuth
  const handleGoogleLogin = () => {
    navigate("/register-google"); // Change this route to whatever you want
  };

  const handleAppleLogin = () => {
    navigate("/register-apple"); // Change if needed
  };

  return (
    <div className="gh-container">
      
      {/* LEFT SIDE */}
      <div className="gh-left">
        <h1>Welcome Back!</h1>
        <p>Your dream job is waiting.</p>
      </div>

      {/* RIGHT SIDE */}
      <div className="gh-right">
        <div className="gh-box">

          <h2 className="form-title">Login to Job Portal</h2>

          {/* SOCIAL LOGIN */}
          <div className="social-login">
            <button className="google-btn" onClick={handleGoogleLogin}>
              <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg" alt="google" />
              Continue with Google
            </button>

            <button className="apple-btn" onClick={handleAppleLogin}>
              <img src="https://cdn-icons-png.flaticon.com/512/0/747.png" alt="apple" />
              Continue with Apple
            </button>
          </div>

          {/* DIVIDER */}
          <div className="divider-line">
            <span>OR</span>
          </div>

          {/* FORM */}
          <label>📧 Email</label>
          <input 
            type="email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)} 
          />

          <label>🔒 Password</label>
          <input 
            type="password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)} 
          />

          {serverError && <p className="error">{serverError}</p>}
          {successMessage && <p className="success">{successMessage}</p>}

          <button onClick={handleLogin}>Login</button>

          <p className="forgot-link" onClick={() => navigate("/FP")}>
            Forgot Password?
          </p>

          <p className="switch" onClick={() => navigate("/")}>
            New user? Create an account
          </p>

        </div>
      </div>
    </div>
  );
}

export default Login;
