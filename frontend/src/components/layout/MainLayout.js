import React from 'react';
import { Outlet } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import GuestNavbar from './GuestNavbar'; // For logged out users
import UserNavbar from './UserNavbar';   // For logged in users
import './MainLayout.css';

const MainLayout = () => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="loading-screen">
        <div className="spinner"></div>
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="main-layout">
      {/* Show different navbar based on auth status */}
      {isAuthenticated ? <UserNavbar /> : <GuestNavbar />}
      
      {/* This will render the current page (Home, Dashboard, etc.) */}
      <main className="main-content">
        <Outlet />
      </main>
      
      {/* Optional Footer */}
      <footer className="footer">
        <p>© 2024 Skillora. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default MainLayout;