import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Fixed imports to correct paths and names
import Registration from './pages/Registration';
import ForgotPassword from './pages/FP';
import ResetPassword from './pages/ResetPassword';
import Login from './pages/login';
import Dashboard from './pages/Jobseekerdashboard';
import LandingPage from './pages/LandingPage';
import AuthPage from './pages/auth';
import Jobseekerprofile from './pages/Jobseekerprofile';
import ProfileManagement from './pages/ProfileManagement';
import ProfileDetails from './pages/ProfileDetails';
import ResumeManagement from './pages/resumemanagement';
import AppliedJobs from './pages/appliedjobs';
import EmployerDashboard from './pages/employerdashboard';
import EmployerCompanyProfile from './pages/EmployerCompanyProfile';
import EditCompanyProfile from './pages/EditCompanyProfile';
import CompanyBranding from './pages/CompanyBranding';
import Jobs from './pages/Jobs';
import JobDetail from './pages/JobDetail';

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
          <Route path="/" element={<LandingPage />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Registration />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/employer-dashboard" element={<EmployerDashboard />} />
          <Route path="/profile" element={<Jobseekerprofile />} />
          <Route path="/profile-management" element={<ProfileManagement />} />
          <Route path="/profile-details" element={<ProfileDetails />} />
          <Route path="/resume" element={<ResumeManagement />} />
          <Route path="/applied-jobs" element={<AppliedJobs />} />
          <Route path="/google" element={<GoogleRedirect />} />
          <Route path="/register-google" element={<GoogleRedirect />} />
          {/* Apple routes commented out - requires paid Apple Developer account */}
          {/* <Route path="/apple" element={<AppleRedirect />} /> */}
          {/* <Route path="/register-apple" element={<AppleRedirect />} /> */}
          <Route path="/FP" element={<ForgotPassword />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
          <Route path="/reset-password-page" element={<ResetPassword />} />
          <Route path="/jobs" element={<Jobs />} />
          <Route path="/jobs/:id" element={<JobDetail />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;