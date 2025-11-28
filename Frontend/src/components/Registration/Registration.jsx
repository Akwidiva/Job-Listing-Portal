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
      await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/auth/register`, formData);

      setSuccessMessage("Account created successfully!");
      setTimeout(() => navigate("/login"), 1500);
    } catch (error) {
      setServerError(error.response?.data?.message || "Registration failed.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex w-screen h-screen m-0 p-0 font-['Segoe_UI',sans-serif]">

      <div className="flex flex-col flex-1 bg-gradient-to-b from-[#0A0F28] to-[#1A2A56] text-white justify-center p-5">
        <h1 className="text-[42px] mb-2.5">Create your free account</h1>
        <p className="text-lg opacity-80">Explore job opportunities and connect with recruiters.</p>

        <img
          src={jobImage}
          alt="job illustration"
          className="w-full"
        />
      </div>

      <div className="flex-1 bg-white flex justify-center items-center">
        <div className="w-[380px] bg-transparent p-0">

          <h2 className="text-center mb-2.5 mt-[-10px] text-[22px] font-semibold">👤 Sign up for Job Portal</h2>

          {/* SOCIAL LOGIN */}
          <div className="mb-2.5 mt-1.5 flex flex-col items-center w-full">

            {/* ✅ Added navigation */}
            <button className="flex justify-center items-center gap-2.5 p-2.5 w-full border border-gray-300 rounded-md bg-gray-50 cursor-pointer text-sm font-medium transition-all duration-200 hover:bg-gray-100" onClick={() => navigate("/google")}>
              <img
                src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg"
                alt="google"
                className="w-5 h-5"
              />
              Sign up with Google
            </button>

            <div className="w-full text-center border-b border-gray-300 leading-[0.1em] my-3.5">
              <span className="bg-white px-2.5 text-gray-500 text-sm">or</span>
            </div>
          </div>

          <label className="block text-sm font-semibold mt-3">👤 Name</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} className="w-full mt-1.5 p-2.5 border border-gray-300 rounded-md text-sm focus:border-black focus:outline-none" />
          {errors.name && <p className="text-red-500 text-xs">{errors.name}</p>}

          <label className="block text-sm font-semibold mt-3">📧 Email</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} className="w-full mt-1.5 p-2.5 border border-gray-300 rounded-md text-sm focus:border-black focus:outline-none" />
          {errors.email && <p className="text-red-500 text-xs">{errors.email}</p>}

          <label className="block text-sm font-semibold mt-3">🔒 Password</label>
          <input type="password" name="password" value={formData.password} onChange={handleChange} className="w-full mt-1.5 p-2.5 border border-gray-300 rounded-md text-sm focus:border-black focus:outline-none" />
          {errors.password && <p className="text-red-500 text-xs">{errors.password}</p>}

          <label className="block text-sm font-semibold mt-3">🔒 Confirm Password</label>
          <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} className="w-full mt-1.5 p-2.5 border border-gray-300 rounded-md text-sm focus:border-black focus:outline-none" />
          {errors.confirmPassword && <p className="text-red-500 text-xs">{errors.confirmPassword}</p>}

          <label className="block text-sm font-semibold mt-3">Select Account Type</label>
          <select name="role" value={formData.role} onChange={handleChange} className="w-full mt-1.5 p-2.5 border border-gray-300 rounded-md text-sm focus:border-black focus:outline-none bg-white">
            <option value="">-- Select --</option>
            <option value="jobseeker">Job Seeker</option>
            <option value="employer">Employer</option>
          </select>
          {errors.role && <p className="text-red-500 text-xs">{errors.role}</p>}

          {serverError && <p className="text-red-500 text-xs">{serverError}</p>}
          {successMessage && <p className="text-green-600 text-xs">{successMessage}</p>}

          <button onClick={handleRegister} className="w-full p-2.5 mt-5 bg-green-600 text-white border-none text-base rounded-md cursor-pointer hover:bg-green-700">
            {isLoading ? "Processing..." : "Create Account"}
          </button>

          <p className="text-center text-black mt-2.5 cursor-pointer hover:underline" onClick={() => navigate("/login")}>
            Already have an account? Login
          </p>

        </div>
      </div>

    </div>
  );
}

export default Registration;
