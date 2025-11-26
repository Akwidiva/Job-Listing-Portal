import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Fixed imports to correct paths and names
import Registration from './components/Registration/Registration';
import ForgotPassword from './components/ForgotPassword/FP';
import ResetPassword from './components/ResetPassword/ResetPassword';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Registration />} />
          <Route path="/FP" element={<ForgotPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;