import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import SplashScreen from "./components/SplashScreen";
import GuestNavbar from "./components/layout/GuestNavbar";
import UserNavbar from "./components/layout/UserNavbar";
import Hero from "./components/Hero";
import Features from "./components/Features";
import JobListings from "./components/JobListings";
import Footer from "./components/Footer";

import LoginModal from "./components/LoginModal";
import RegisterModal from "./components/RegisterModal";

// Import all the new page components
import Dashboard from "./pages/Dashboard/Dashboard";
import Jobs from "./pages/Jobs/Jobs";
import Companies from "./pages/Companies/Companies";
import Profile from "./pages/Profile/Profile";
import Applications from "./pages/Applications/Applications";
import Contact from "./pages/Contact/Contact";

import "./App.css";

// Create a simple About component directly in App.js
const About = () => (
  <div style={styles.pageContainer}>
    <div style={styles.pageHeader}>
      <h1>About Skillora</h1>
      <p>Connecting talent with opportunity since 2024</p>
    </div>
    
    <div style={styles.aboutContent}>
      <section style={styles.section}>
        <h2>Our Mission</h2>
        <p>
          At Skillora, we believe that everyone deserves to find work they love. 
          Our mission is to connect talented professionals with amazing companies, 
          creating opportunities for growth and success.
        </p>
      </section>
      
      <section style={styles.section}>
        <h2>What We Do</h2>
        <div style={styles.featuresGrid}>
          <div style={styles.feature}>
            <div style={styles.featureIcon}>🔍</div>
            <h3>Smart Job Matching</h3>
            <p>Advanced algorithms match your skills with perfect opportunities.</p>
          </div>
          <div style={styles.feature}>
            <div style={styles.featureIcon}>📊</div>
            <h3>Career Insights</h3>
            <p>Get detailed analytics about your job search and applications.</p>
          </div>
          <div style={styles.feature}>
            <div style={styles.featureIcon}>🤝</div>
            <h3>Direct Connections</h3>
            <p>Connect directly with hiring managers and recruiters.</p>
          </div>
        </div>
      </section>
      
      <section style={styles.section}>
        <h2>Our Story</h2>
        <p>
          Founded in 2024 by a team of tech industry veterans, Skillora was born 
          from the frustration of traditional job search platforms. We wanted to 
          create something better—a platform that actually understands what job 
          seekers and employers need.
        </p>
      </section>
      
      <section style={styles.section}>
        <h2>By The Numbers</h2>
        <div style={styles.statsGrid}>
          <div style={styles.stat}>
            <h3>50,000+</h3>
            <p>Job Seekers</p>
          </div>
          <div style={styles.stat}>
            <h3>2,500+</h3>
            <p>Companies</p>
          </div>
          <div style={styles.stat}>
            <h3>100,000+</h3>
            <p>Jobs Posted</p>
          </div>
          <div style={styles.stat}>
            <h3>95%</h3>
            <p>Satisfaction Rate</p>
          </div>
        </div>
      </section>
    </div>
  </div>
);

function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);

  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem("token")
  );

  // Splash screen timeout
  useEffect(() => {
    const timer = setTimeout(() => setShowSplash(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  // Handle login success
  const handleLoginSuccess = (token, userData) => {
    localStorage.setItem("token", token);
    if (userData) {
      localStorage.setItem("user", JSON.stringify(userData));
    }
    setIsAuthenticated(true);
    setShowLoginModal(false);
    
    // Redirect to dashboard after successful login
    window.location.href = "/dashboard";
  };

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsAuthenticated(false);
    window.location.href = "/";
  };

  // Protect routes - only accessible when logged in
  const ProtectedRoute = ({ children }) => {
    if (!isAuthenticated) {
      return <Navigate to="/" />;
    }
    return children;
  };

  // Public routes - only accessible when NOT logged in
  const PublicRoute = ({ children }) => {
    if (isAuthenticated) {
      return <Navigate to="/dashboard" />;
    }
    return children;
  };

  if (showSplash) return <SplashScreen />;

  return (
    <Router>
      {/* Show GuestNavbar when not logged in, UserNavbar when logged in */}
      {isAuthenticated ? (
        <UserNavbar onLogoutClick={handleLogout} />
      ) : (
        <GuestNavbar 
          onLoginClick={() => setShowLoginModal(true)}
          onRegisterClick={() => setShowRegisterModal(true)}
        />
      )}

      {/* ROUTES */}
      <Routes>
        {/* Home Page - Public */}
        <Route
          path="/"
          element={
            <PublicRoute>
              <>
                <Hero />
                <Features />
                <JobListings />
                <Footer />
              </>
            </PublicRoute>
          }
        />

        {/* Dashboard Page - Protected */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        {/* Profile Page - Protected */}
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

        {/* Applications Page - Protected */}
        <Route
          path="/applications"
          element={
            <ProtectedRoute>
              <Applications />
            </ProtectedRoute>
          }
        />

        {/* Jobs Page - Public */}
        <Route
          path="/jobs"
          element={<Jobs />}
        />

        {/* Companies Page - Public */}
        <Route
          path="/companies"
          element={<Companies />}
        />

        {/* About Page - Public */}
        <Route
          path="/about"
          element={<About />}
        />

        {/* Contact Page - Public */}
        <Route
          path="/contact"
          element={<Contact />}
        />

        {/* Redirect any unknown route to home */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>

      {/* LOGIN MODAL - Only show when not logged in */}
      {showLoginModal && !isAuthenticated && (
        <LoginModal
          onClose={() => setShowLoginModal(false)}
          onLogin={handleLoginSuccess}
          onSwitchToRegister={() => {
            setShowLoginModal(false);
            setShowRegisterModal(true);
          }}
        />
      )}

      {/* REGISTER MODAL - Only show when not logged in */}
      {showRegisterModal && !isAuthenticated && (
        <RegisterModal
          onClose={() => setShowRegisterModal(false)}
          onSwitchToLogin={() => {
            setShowRegisterModal(false);
            setShowLoginModal(true);
          }}
          onRegister={handleLoginSuccess}
        />
      )}
    </Router>
  );
}

// Styles for the About component
const styles = {
  pageContainer: {
    padding: '2rem',
    maxWidth: '1200px',
    margin: '0 auto',
    minHeight: '70vh'
  },
  pageHeader: {
    textAlign: 'center',
    marginBottom: '3rem'
  },
  pageHeaderH1: {
    fontSize: '2.5rem',
    fontWeight: '700',
    color: '#1a202c',
    marginBottom: '0.5rem'
  },
  pageHeaderP: {
    color: '#718096',
    fontSize: '1.1rem'
  },
  aboutContent: {
    display: 'flex',
    flexDirection: 'column',
    gap: '3rem'
  },
  section: {
    background: 'white',
    borderRadius: '12px',
    padding: '2rem',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)'
  },
  sectionH2: {
    fontSize: '1.75rem',
    fontWeight: '600',
    color: '#1a202c',
    marginBottom: '1rem'
  },
  sectionP: {
    color: '#4a5568',
    lineHeight: '1.6',
    fontSize: '1.1rem'
  },
  featuresGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '2rem',
    marginTop: '1.5rem'
  },
  feature: {
    textAlign: 'center',
    padding: '1.5rem',
    background: '#f8fafc',
    borderRadius: '8px'
  },
  featureIcon: {
    fontSize: '2rem',
    marginBottom: '1rem'
  },
  featureH3: {
    fontSize: '1.25rem',
    fontWeight: '600',
    color: '#1a202c',
    marginBottom: '0.5rem'
  },
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '2rem',
    marginTop: '1.5rem'
  },
  stat: {
    textAlign: 'center',
    padding: '1.5rem',
    background: 'linear-gradient(135deg, #667eea20 0%, #764ba220 100%)',
    borderRadius: '8px'
  },
  statH3: {
    fontSize: '2.5rem',
    fontWeight: '700',
    color: '#667eea',
    marginBottom: '0.5rem'
  },
  statP: {
    color: '#4a5568',
    fontSize: '1rem',
    fontWeight: '500'
  }
};

export default App;