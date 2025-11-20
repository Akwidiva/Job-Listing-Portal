import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Registration.css";

const RegisterForm = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({});
    setServerError("");
    setSuccessMessage("");
  };

  const validate = () => {
    let newErrors = {};

    // Name
    if (!formData.name.trim()) newErrors.name = "Name is required";
    else if (!/^[a-zA-Z\s]+$/.test(formData.name.trim())) {
      newErrors.name = "Name must contain only letters and spaces";
    }

    // Email
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!formData.email.endsWith("@gmail.com"))
      newErrors.email = "Email must end with @gmail.com";

    // Password
    if (!formData.password) newErrors.password = "Password is required";

    const strongPassword =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;

    if (formData.password && !strongPassword.test(formData.password)) {
      newErrors.password =
        "Password must be 8+ chars & include uppercase, lowercase, number, special char";
    }

    // Confirm Password
    if (!formData.confirmPassword)
      newErrors.confirmPassword = "Confirm Password is required";
    else if (formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = "Passwords do not match";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;

    setIsLoading(true);
    setServerError("");
    setSuccessMessage("");

    try {
      const payload = {
        name: formData.name,
        email: formData.email,
        password: formData.password,
      };

      const response = await axios.post(
        "http://localhost:5000/api/auth/register",
        payload
      );

      setSuccessMessage("Registration Successful! Redirecting to login...");

      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch (error) {
      if (error.response) setServerError(error.response.data.error);
      else setServerError("Registration failed. Try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="header">
        <div className="icon-title">
          <span className="user-icon">👤</span> Join Our Job Portal
        </div>
        <div className="underline"></div>
      </div>

      <div className="inputs">
        {/* Name */}
        <label className="label">Name</label>
        <div className="input">
          <span className="field-icon">👤</span>
          <input
            type="text"
            name="name"
            placeholder="Enter Your Name"
            value={formData.name}
            onChange={handleChange}
          />
        </div>
        {errors.name && <p className="error-text">{errors.name}</p>}

        {/* Email */}
        <label className="label">Email</label>
        <div className="input">
          <span className="field-icon">📧</span>
          <input
            type="email"
            name="email"
            placeholder="Enter Gmail Address"
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

        {/* Confirm Password */}
        <label className="label">Confirm Password</label>
        <div className="input">
          <span className="field-icon">🔒</span>
          <input
            type="password"
            name="confirmPassword"
            placeholder="Re-enter Password"
            value={formData.confirmPassword}
            onChange={handleChange}
          />
        </div>
        {errors.confirmPassword && (
          <p className="error-text">{errors.confirmPassword}</p>
        )}
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
          {isLoading ? "Creating Account..." : "Create Account"}
        </button>

        {serverError && (
          <p className="error-text" style={{ color: "red" }}>
            {serverError}
          </p>
        )}

        {successMessage && (
          <p style={{ color: "green" }}>{successMessage}</p>
        )}
      </div>
    </div>
  );
};

export default RegisterForm;
