import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Sidebar from "./components/Sidebar";
import DriverSidebar from "./components/DriverSidebar";
import HomePage from "./pages/HomePage";
import Ambulances from "./pages/Ambulances";
import Hospitals from "./pages/Hospitals";
import Register from "./pages/Register";
import Login from "./pages/Login";
import EmergencyHelpline from "./pages/EmergencyHelpline";
import DriverRequests from "./pages/DriverRequests";
import RidesHistory from "./pages/RidesHistory";
import PaymentHistory from "./pages/PaymentHistory";
import ConfirmBooking from "./pages/ConfirmBooking";
import Quiz from "./pages/Quiz";
import Profile from "./pages/Profile";
import GovernmentPrograms from "./pages/GovernmentPrograms";

import { Buffer } from "buffer";
import process from "process";
window.Buffer = Buffer;
window.process = process;


function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

function AppContent() {
  const location = useLocation();
  const isHomePage = location.pathname === "/";
  const isRegisterPage = location.pathname === "/register";
  const isLoginPage = location.pathname === "/login";
  const isEmergencyHelplinePage = location.pathname === "/emergencyhelpline";
  const isUserDriver = location.pathname.startsWith("/driver");

  return (
    <div className={`flex min-h-screen`}>
      {!isHomePage &&
        !isRegisterPage &&
        !isLoginPage &&
        !isEmergencyHelplinePage &&
        !isUserDriver && <Sidebar />}
      {!isHomePage &&
        !isRegisterPage &&
        !isLoginPage &&
        !isEmergencyHelplinePage &&
        isUserDriver && <DriverSidebar />}
      <main className="flex-1 overflow-y-auto">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/confirm-booking" element={<ConfirmBooking />} />
          <Route path="/login" element={<Login />} />
          <Route path="/emergencyhelpline" element={<EmergencyHelpline />} />
          <Route path="/ambulance" element={<Ambulances />} />
          <Route path="/hospitals" element={<Hospitals />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/governmentprograms" element={<GovernmentPrograms />} />
          <Route path="/driver/requests" element={<DriverRequests />} />
          <Route path="/driver/rides-history" element={<RidesHistory />} />
          <Route path="/driver/payment-history" element={<PaymentHistory />} />
          <Route path="/driver/quiz" element={<Quiz />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
