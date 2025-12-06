import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import './AuthModals.css';

function LoginModal({ onClose, onLogin, onSwitchToRegister }) {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
    setServerError('');
  };

  const validateForm = () => {
    const newErrors = {};
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
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    setServerError('');

    try {
      const loginData = {
        email: formData.email.toLowerCase(),
        password: formData.password
      };

      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(loginData)
      });

      if (!response) throw new Error('No response from server');

      const data = await response.json();

      if (!response.ok) {
        setServerError(data.message || 'Login failed');
        return;
      }

      if (onLogin) {
        onLogin({
          email: data.user?.email || formData.email,
          name: data.user?.name || formData.email.split('@')[0],
          role: data.user?.role,
          token: data.token,
          ...data
        });
      }

      setFormData({ email: '', password: '' });

      if (onClose) onClose();

      // 🔥 Redirect back to SAME PAGE (Home)
      navigate('/');

    } catch (error) {
      console.error('Login error:', error);
      setServerError(error.message || 'Login failed');
      if (onLogin) {
        onLogin({ error: error.message, success: false });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <div className="modal-header">
          <h2 className="modal-title">🔑 Welcome Back</h2>
          <p className="modal-subtitle">Sign in to your account</p>
          <button onClick={onClose} className="modal-close">✕</button>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label htmlFor="email" className="form-label">📧 Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`form-input ${errors.email ? 'error' : ''}`}
              placeholder="you@example.com"
              disabled={isLoading}
            />
            {errors.email && <span className="error-message">{errors.email}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="password" className="form-label">🔒 Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className={`form-input ${errors.password ? 'error' : ''}`}
              placeholder="Enter your password"
              disabled={isLoading}
            />
            {errors.password && <span className="error-message">{errors.password}</span>}
          </div>

          {serverError && <div className="server-error-message">⚠️ {serverError}</div>}

          <button type="submit" className="submit-btn" disabled={isLoading}>
            {isLoading ? '🔐 Signing In...' : '🔑 Sign In'}
          </button>

          <div className="auth-switch">
            <span>Don't have an account?</span>
            <button type="button" onClick={onSwitchToRegister} disabled={isLoading}>
              Sign up here
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}


LoginModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  onLogin: PropTypes.func,
  onSwitchToRegister: PropTypes.func.isRequired
};

LoginModal.defaultProps = {
  onLogin: () => {},
};

export default LoginModal;
