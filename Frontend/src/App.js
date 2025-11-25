import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Fix 1: Correct import names (FP not IP)
import RegistrationForm from './components/auth/RegisterForm';
import ForgotPasswordForm from './components/auth/ForgotPasswordForm';
import ResetPasswordForm from './components/auth/ResetPasswordForm';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Fix 2: Use <Route> not <Router> */}
          <Route path="/" element={<RegistrationForm />} />
          <Route path="/FP" element={<ForgotPasswordForm />} />
          <Route path="/reset-password/:token" element={<ResetPasswordForm />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;




