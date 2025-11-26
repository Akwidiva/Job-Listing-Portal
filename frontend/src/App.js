import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Fixed imports to correct paths and names
import Registration from './components/Registration/Registration';
import ForgotPassword from './components/ForgotPassword/FP';
import ResetPassword from './components/ResetPassword/ResetPassword';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import ResetPasswordPage from './pages/ResetPasswordPage';
import Dashboard from './components/Dashboard/Dashboard';

// Component that redirects to Google OAuth
function GoogleRedirect() {
  React.useEffect(() => {
    window.location.href = `${process.env.REACT_APP_BACKEND_URL}/api/auth/google`;
  }, []);

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      fontFamily: 'Arial'
    }}>
      <p>Redirecting to Google...</p>
    </div>
  );
}

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Registration />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/google" element={<GoogleRedirect />} />
          <Route path="/register-google" element={<GoogleRedirect />} />
          {/* Apple routes commented out - requires paid Apple Developer account */}
          {/* <Route path="/apple" element={<AppleRedirect />} /> */}
          {/* <Route path="/register-apple" element={<AppleRedirect />} /> */}
          <Route path="/FP" element={<ForgotPassword />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
          <Route path="/reset-password-page" element={<ResetPasswordPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;