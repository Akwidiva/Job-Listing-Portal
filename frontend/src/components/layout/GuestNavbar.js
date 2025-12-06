import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const GuestNavbar = ({ onLoginClick, onRegisterClick }) => {
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

        {/* Navigation Links */}
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
            <button className="search-btn">🔍</button>
          </div>
        </div>

        {/* Auth Buttons */}
        <div className="nav-auth">
          <button 
            onClick={onLoginClick} 
            className="auth-btn login-btn"
          >
            Login
          </button>
          <button 
            onClick={onRegisterClick} 
            className="auth-btn register-btn"
          >
            Register
          </button>
        </div>

      </div>
    </nav>
  );
};

export default GuestNavbar;
