import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './AuthModals.css';

function RegisterModal({ onClose, onRegister, onSwitchToLogin }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    userType: 'job-seeker'
  });
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
    setServerError('');
    setSuccessMessage('');
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Full name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    if (!agreeTerms) {
      newErrors.terms = 'You must agree to the terms and conditions';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0 ? newErrors : newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) return;
    
    setIsLoading(true);
    setServerError('');
    setSuccessMessage('');
    
    try {
      const registrationData = {
        name: formData.name,
        email: formData.email.toLowerCase(),
        password: formData.password,
        role: formData.userType === 'job-seeker' ? 'jobseeker' : 'employer'
      };
      
      const response = await fetch("http://localhost:5000/api/auth/register", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(registrationData)
      });

      let data;
      try {
        data = await response.json();
      } catch {
        throw new Error('Server response error. Please try again.');
      }

      if (!response.ok) {
        if (response.status === 400 || response.status === 409) {
          setErrors(prev => ({
            ...prev,
            email: 'This email is already registered.'
          }));
          setServerError('This email address is already registered.');
        } else {
          setServerError(data.message || 'Registration failed.');
        }
        return;
      }

      // SUCCESS
      setSuccessMessage("Account created successfully!");

      // 🔥 REQUIRED UPDATE → Immediately switch to Login
      onSwitchToLogin(formData.email);

      // Clear form
      setFormData({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        userType: 'job-seeker'
      });
      setAgreeTerms(false);

    } catch (error) {
      setServerError(error.message || "Registration failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSwitchToLogin = () => {
    onSwitchToLogin(formData.email);
  };

  const handleModalClose = () => {
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <div className="modal-header">
          <h2 className="modal-title">🚀 Start Your Journey</h2>
          <p className="modal-subtitle">Create your free account</p>
          <button onClick={handleModalClose} className="modal-close">✕</button>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">

          {/* User Type */}
          <div className="form-group">
            <label className="form-label">👤 I am a</label>
            <div className="user-type-selector">
              <label className={`user-type-option ${formData.userType === 'job-seeker' ? 'active' : ''}`}>
                <input
                  type="radio"
                  name="userType"
                  value="job-seeker"
                  checked={formData.userType === 'job-seeker'}
                  onChange={handleChange}
                  disabled={isLoading}
                />
                <span className="option-content">
                  <span className="option-icon">👤</span>
                  <span className="option-text">Job Seeker</span>
                </span>
              </label>
              <label className={`user-type-option ${formData.userType === 'employer' ? 'active' : ''}`}>
                <input
                  type="radio"
                  name="userType"
                  value="employer"
                  checked={formData.userType === 'employer'}
                  onChange={handleChange}
                  disabled={isLoading}
                />
                <span className="option-content">
                  <span className="option-icon">🏢</span>
                  <span className="option-text">Employer</span>
                </span>
              </label>
            </div>
          </div>

          {/* Name */}
          <div className="form-group">
            <label className="form-label">👤 Full Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`form-input ${errors.name ? 'error' : ''}`}
              disabled={isLoading}
            />
            {errors.name && <span className="error-message">{errors.name}</span>}
          </div>

          {/* Email */}
          <div className="form-group">
            <label className="form-label">📧 Email Address</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`form-input ${errors.email ? 'error' : ''}`}
              disabled={isLoading}
            />
            {errors.email && <span className="error-message">{errors.email}</span>}
          </div>

          {/* Password */}
          <div className="form-group">
            <label className="form-label">🔒 Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className={`form-input ${errors.password ? 'error' : ''}`}
              disabled={isLoading}
            />
            {errors.password && <span className="error-message">{errors.password}</span>}
          </div>

          {/* Confirm Password */}
          <div className="form-group">
            <label className="form-label">🔐 Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className={`form-input ${errors.confirmPassword ? 'error' : ''}`}
              disabled={isLoading}
            />
            {errors.confirmPassword && <span className="error-message">{errors.confirmPassword}</span>}
          </div>

          {/* Terms */}
          <div className="form-group checkbox-group">
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={agreeTerms}
                onChange={() => setAgreeTerms(!agreeTerms)}
                disabled={isLoading}
              />
              <span>I agree to Terms & Privacy Policy</span>
            </label>
            {errors.terms && <span className="error-message">{errors.terms}</span>}
          </div>

          {serverError && <div className="server-error-message">⚠️ {serverError}</div>}
          {successMessage && <div className="success-message">✅ {successMessage}</div>}

          <button type="submit" className="submit-btn" disabled={isLoading}>
            {isLoading ? '⏳ Creating account...' : '🚀 Create Account'}
          </button>

          <div className="auth-switch">
            <span>Already have an account?</span>
            <button type="button" onClick={handleSwitchToLogin} className="switch-btn">
              Sign in here
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}

RegisterModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  onRegister: PropTypes.func,
  onSwitchToLogin: PropTypes.func.isRequired
};

RegisterModal.defaultProps = {
  onRegister: () => {},
  onClose: () => {},
  onSwitchToLogin: () => {}
};

export default RegisterModal;
