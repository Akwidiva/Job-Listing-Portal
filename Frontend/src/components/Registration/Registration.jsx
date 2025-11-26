import React, { useState } from "react";
import "./Registration.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import jobImage from "./image.png";

function Registration() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "",
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

    if (!formData.name.trim())
      newErrors.name = "Name is required";
    else if (!/^[a-zA-Z\s]+$/.test(formData.name.trim()))
      newErrors.name = "Name must contain only letters";

    if (!formData.email.trim())
      newErrors.email = "Email is required";
    else if (!formData.email.endsWith("@gmail.com"))
      newErrors.email = "Email must end with @gmail.com";

    const strongPassword =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (!formData.password)
      newErrors.password = "Password is required";
    else if (!strongPassword.test(formData.password))
      newErrors.password =
        "Password must include uppercase, lowercase, number & special character";

    if (!formData.confirmPassword)
      newErrors.confirmPassword = "Confirm password required";
    else if (formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = "Passwords do not match";

    if (!formData.role) newErrors.role = "Select account type";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRegister = async () => {
    if (!validate()) return;

    setIsLoading(true);

    try {
      await axios.post("http://localhost:5000/api/auth/register", formData);

      setSuccessMessage("Account created successfully!");
      setTimeout(() => navigate("/login"), 1500);
    } catch (error) {
      setServerError(error.response?.data?.message || "Registration failed.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="gh-container">

      <div className="gh-left">
        <h1>Create your free account</h1>
        <p>Explore job opportunities and connect with recruiters.</p>

        <img 
          src={jobImage}
          alt="job illustration"
          style={{ width: "100%" }}
        />
      </div>

      <div className="gh-right">
        <div className="gh-box">

          <h2 className="form-title">👤 Sign up for Job Portal</h2>

          {/* SOCIAL LOGIN */}
          <div className="social-login">

            {/* ✅ Added navigation */}
            <button className="google-btn" onClick={() => navigate("/google")}>
              <img
                src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg"
                alt="google"
              />
              Continue with Google
            </button>

            {/* ✅ Added navigation */}
            <button className="apple-btn" onClick={() => navigate("/apple")}>
              <img src="https://cdn-icons-png.flaticon.com/512/0/747.png" alt="apple" />
              Continue with Apple
            </button>

            <div className="divider-line">
              <span>or</span>
            </div>
          </div>

          <label>👤 Name</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} />
          {errors.name && <p className="error">{errors.name}</p>}

          <label>📧 Email</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} />
          {errors.email && <p className="error">{errors.email}</p>}

          <label>🔒 Password</label>
          <input type="password" name="password" value={formData.password} onChange={handleChange} />
          {errors.password && <p className="error">{errors.password}</p>}

          <label>🔒 Confirm Password</label>
          <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} />
          {errors.confirmPassword && <p className="error">{errors.confirmPassword}</p>}

          <label>Select Account Type</label>
          <select name="role" value={formData.role} onChange={handleChange}>
            <option value="">-- Select --</option>
            <option value="jobseeker">Job Seeker</option>
            <option value="employer">Employer</option>
          </select>
          {errors.role && <p className="error">{errors.role}</p>}

          {serverError && <p className="error">{serverError}</p>}
          {successMessage && <p className="success">{successMessage}</p>}

          <button onClick={handleRegister}>
            {isLoading ? "Processing..." : "Create Account"}
          </button>

          <p className="switch" onClick={() => navigate("/login")}>
            Already have an account? Login
          </p>

        </div>
      </div>

    </div>
  );
}

export default Registration;
