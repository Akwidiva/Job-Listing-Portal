import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
//import "./Login.css"; // optional styling file

const LoginForm = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Input handler
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({});
    setServerError("");
  };

  // Validation
  const validate = () => {
    let newErrors = {};

    if (!formData.email.trim()) newErrors.email = "Email is required";
    if (!formData.password) newErrors.password = "Password is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Submit handler
  const handleSubmit = async () => {
    if (!validate()) return;

    setIsLoading(true);
    setServerError("");

    try {
      const payload = {
        email: formData.email,
        password: formData.password,
      };

      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        payload
      );

      // Store token + user info
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      // Redirect to dashboard after login
      navigate("/dashboard");

    } catch (error) {
      if (error.response) {
        setServerError(error.response.data.error);
      } else {
        setServerError("Login failed. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="header">
        <div className="icon-title">
          <span className="user-icon">🔐</span> Login to Your Account
        </div>
        <div className="underline"></div>
      </div>

      <div className="inputs">
        {/* Email */}
        <label className="label">Email</label>
        <div className="input">
          <span className="field-icon">📧</span>
          <input
            type="email"
            name="email"
            placeholder="Enter Your Email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        {errors.email && <p className="error-text">{errors.email}</p>}

        {/* Password */}
        <label className="label">Password</label>
        <div className="input">
          <span className="field-icon">🔒</span>
          <input
            type="password"
            name="password"
            placeholder="Enter Password"
            value={formData.password}
            onChange={handleChange}
          />
        </div>
        {errors.password && <p className="error-text">{errors.password}</p>}
      </div>

      <div
        className="forgot-password"
        onClick={() => navigate("/FP")}
        style={{ cursor: "pointer", color: "blue" }}
      >
        Forgot Password?
      </div>

      <div className="submit-container">
        <button className="submit" onClick={handleSubmit} disabled={isLoading}>
          {isLoading ? "Logging In..." : "Login"}
        </button>

        {serverError && (
          <p className="error-text" style={{ color: "red" }}>
            {serverError}
          </p>
        )}
      </div>
    </div>
  );
};

export default LoginForm;
