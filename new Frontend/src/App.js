import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Pages
import Registration from "./Components/Registration/Registration";
import Login from "./Components/login/login";
import ForgotPassword from "./Components/ForgotPassword/FP";
import ResetPassword from "./Components/ResetPassword/ResetPassword";
import Dashboard from "./Components/Dashboard/Dashboard";

// Social Login Pages
import GooglePage from "./Components/Social/GooglePage";
import ApplePage from "./Components/Social/ApplePage";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>

          <Route path="/" element={<Registration />} />

          {/* LOG IN PAGE */}
          <Route path="/login" element={<Login />} />

          <Route path="/FP" element={<ForgotPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />

          {/* DASHBOARD */}
          <Route path="/dashboard" element={<Dashboard />} />

          {/* SOCIAL LOGIN ROUTES (NEW) */}
          <Route path="/google" element={<GooglePage />} />
          <Route path="/apple" element={<ApplePage />} />

        </Routes>
      </div>
    </Router>
  );
}

export default App;
