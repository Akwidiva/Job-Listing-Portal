import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Dashboard() {
  const navigate = useNavigate();

  useEffect(() => {
    // Check for token in URL parameters (from OAuth redirect)
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');

    if (token) {
      // Store the token and clean up URL
      localStorage.setItem('token', token);
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, []);

  const handleLogout = async () => {
    try {
      await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/auth/logout`);
    } catch (error) {
      console.error('Logout error:', error);
    }
    // Clear token and redirect to login
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div style={{
      background: "black",
      color: "white",
      height: "100vh",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      fontFamily: "Arial"
    }}>
      <h1>Welcome to Dashboard</h1>
      <p>Your login was successful!</p>
      <p>You can now access the full application.</p>
      <button
        onClick={handleLogout}
        style={{
          marginTop: "20px",
          padding: "10px 20px",
          background: "red",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer"
        }}
      >
        Logout
      </button>
    </div>
  );
}

export default Dashboard;
