import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './Navbar.css';

const Navbar = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="nav-container">
        {/* Logo */}
        <div className="nav-brand">
          <Link to="/" className="logo">
            <span className="logo-icon">💼</span>
            <span className="logo-text">Skillora</span>
          </Link>
        </div>

        {/* Navigation Links - Always Visible */}
        <div className="nav-links">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/jobs" className="nav-link">Find Jobs</Link>
          <Link to="/companies" className="nav-link">Companies</Link>
          <Link to="/about" className="nav-link">About</Link>
          <Link to="/contact" className="nav-link">Contact</Link>
          
          {/* Job Search Bar */}
          <div className="search-container">
            <input 
              type="text" 
              placeholder="Search jobs, companies, keywords..." 
              className="search-input"
            />
            <button className="search-btn">
              🔍
            </button>
          </div>
        </div>

        {/* Right Side - Auth Buttons */}
        <div className="nav-auth">
          {isAuthenticated ? (
            // Logged In View
            <div className="user-menu">
              <Link to="/dashboard" className="auth-btn dashboard-btn">
                <span className="btn-icon">📊</span>
                Dashboard
              </Link>
              <div className="user-dropdown">
                <button className="user-profile">
                  <span className="avatar">
                    {user?.name?.charAt(0) || 'U'}
                  </span>
                  <span className="user-name">{user?.name || 'User'}</span>
                  <span className="dropdown-arrow">▼</span>
                </button>
                <div className="dropdown-menu">
                  <Link to="/profile" className="dropdown-item">
                    <span className="item-icon">👤</span>
                    My Profile
                  </Link>
                  <Link to="/my-jobs" className="dropdown-item">
                    <span className="item-icon">💼</span>
                    My Jobs
                  </Link>
                  <Link to="/applications" className="dropdown-item">
                    <span className="item-icon">📄</span>
                    Applications
                  </Link>
                  <div className="dropdown-divider"></div>
                  <button onClick={handleLogout} className="dropdown-item logout">
                    <span className="item-icon">🚪</span>
                    Logout
                  </button>
                </div>
              </div>
            </div>
          ) : (
            // Logged Out View
            <div className="auth-buttons">
              <Link to="/login" className="auth-btn login-btn">
                Login
              </Link>
              <Link to="/register" className="auth-btn register-btn">
                Register
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;