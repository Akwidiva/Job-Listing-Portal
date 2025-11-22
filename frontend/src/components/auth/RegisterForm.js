import React, { useState } from "react";
import "./Registration.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

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
  const [successMessage, setSuccessMessage] = useState(""); // ✅ Success text
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setServerError("");
    setSuccessMessage(""); 
  };

  const validate = () => {
    let newErrors = {};

    if (!formData.name.trim()) newErrors.name = "Name is required";
    else if (!/^[a-zA-Z\s]+$/.test(formData.name.trim())) {
      newErrors.name = "Name must contain only letters and spaces";
    }
    if (!formData.email.trim()) newErrors.email = "Email is required";
    if (!formData.password) newErrors.password = "Password is required";
    if (!formData.confirmPassword)
      newErrors.confirmPassword = "Confirm Password is required";

    if (formData.email && !formData.email.endsWith("@gmail.com")) {
      newErrors.email = "Email must end with @gmail.com";
    }

    const strongPassword =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (formData.password && !strongPassword.test(formData.password)) {
      newErrors.password =
        "Password must be 8+ characters and include uppercase, lowercase, number & special character";
    }

    if (
      formData.password &&
      formData.confirmPassword &&
      formData.password !== formData.confirmPassword
    ) {
      newErrors.confirmPassword = "Passwords do not match";
    }

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
        username: formData.name,
        email: formData.email,
        password: formData.password,
      };

      const response = await axios.post(
        "http://localhost:5001/api/auth/register",
        payload
      );

      console.log("Registration success:", response.data);

      setSuccessMessage("Registration Successful! Redirecting to login...");

      setTimeout(() => {
        navigate("/login");
      }, 1500);

    } catch (error) {
      if (error.response) {
        setServerError(error.response.data.error);
      } else {
        setServerError("Registration failed. Try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="header">
        <div className="icon-title">
          <span className="user-icon">👤</span>
          Join Our Job Portal
        </div>
        <div className="underline"></div>
      </div>

      <div className="inputs">
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
        {errors.name && <div className="error-text">{errors.name}</div>}

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
        {errors.email && <div className="error-text">{errors.email}</div>}

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
        {errors.password && <div className="error-text">{errors.password}</div>}

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
          <div className="error-text">{errors.confirmPassword}</div>
        )}
      </div>

      <div
        className="forgot-password"
        style={{ cursor: "pointer", color: "blue" }}
        onClick={() => navigate("/FP")}
      >
        Forgot Password?
      </div>

      <div className="submit-container">
        <button className="submit" onClick={handleSubmit} disabled={isLoading}>
          {isLoading ? "Creating Account..." : "Create Account"}
        </button>

        {/* ❌ ERROR MESSAGE */}
        {serverError && (
          <p
            style={{
              color: "red",
              marginTop: "12px",
              fontSize: "14px",
              textAlign: "center",
            }}
          >
            {serverError}
          </p>
        )}

        {/* ✅ SUCCESS MESSAGE */}
        {successMessage && (
          <p
            style={{
              color: "green",
              marginTop: "12px",
              fontSize: "14px",
              textAlign: "center",
            }}
          >
            {successMessage}
          </p>
        )}
      </div>
    </div>
  );
};

export default RegisterForm;