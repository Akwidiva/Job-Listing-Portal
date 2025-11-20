import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Fix 1: Correct import names (FP not IP)
import Registration from './components/auth/RegisterForm';
import ForgotPassword from './components/auth/ForgotPasswordForm';
import ResetPassword from './components/auth/ResetPasswordForm';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Fix 2: Use <Route> not <Router> */}
          <Route path="/" element={<Registration />} />
          <Route path="/FP" element={<ForgotPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;