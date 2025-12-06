import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './UserNavbar.css';

const UserNavbar = ({ onLogoutClick }) => {
  const navigate = useNavigate();
  
  // Get user data from localStorage
  const user = JSON.parse(localStorage.getItem('user')) || {
    name: 'John Doe',
    email: 'john.doe@example.com'
  };

  const handleLogout = () => {
    onLogoutClick();
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="nav-container">
        {/* Logo */}
        <div className="nav-brand">
          <Link to="/dashboard" className="logo">
            <span className="logo-icon">💼</span>
            <span className="logo-text">Skillora</span>
          </Link>
        </div>

        {/* Navigation Links for logged-in users */}
        <div className="nav-links">
          <Link to="/about" className="nav-link">About</Link>
          <Link to="/dashboard" className="nav-link">Dashboard</Link>
          <Link to="/profile" className="nav-link">Profile</Link>
          <Link to="/jobs" className="nav-link">Find Jobs</Link>
          <Link to="/applications" className="nav-link">Applications</Link>       
          <Link to="/companies" className="nav-link">Companies</Link> 
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

        {/* User Profile Circle & Menu */}
        <div className="user-profile-section">
          {/* Profile Circle */}
          <div className="navbar-profile-circle">
            {user.name.charAt(0).toUpperCase()}
          </div>
          
          {/* User Menu Dropdown */}
          <div className="user-menu">
            <span className="user-name">{user.name.split(' ')[0]}</span>
            <div className="dropdown-menu">
              <Link to="/profile" className="dropdown-item">
                👤 My Profile
              </Link>
              <Link to="/dashboard" className="dropdown-item">
                📊 Dashboard
              </Link>
              <Link to="/applications" className="dropdown-item">
                📄 Applications
              </Link>
              <div className="dropdown-divider"></div>
              <button onClick={handleLogout} className="dropdown-item logout">
                🚪 Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default UserNavbar;