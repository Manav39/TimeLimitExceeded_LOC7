import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import Wills from './pages/Wills';
import Beneficiaries from './pages/Beneficiaries';
import Documents from './pages/Documents';
import Assets from './pages/Assets';
import Contracts from './pages/Contracts';
import Transactions from './pages/Transactions';
import Settings from './pages/Settings';
import HomePage from './pages/HomePage';
import Ambulances from './pages/Ambulances';
import Hospitals from './pages/Hospitals';
import Register from './pages/Register';
import Login from './pages/Login';
import EmergencyHelpline from './pages/EmergencyHelpline';

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

function AppContent() {
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  const isRegisterPage = location.pathname === '/register';
  const isLoginPage = location.pathname === '/login';
  const isEmergencyHelplinePage = location.pathname === '/emergencyhelpline';

  return (
    <div className={`flex min-h-screen`}>
      {(!isHomePage && !isRegisterPage && !isLoginPage && !isEmergencyHelplinePage) && <Sidebar />}
      <main className="flex-1 overflow-y-auto">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          {/* <Router path="/register" element={<Register/>}/> */}
          
          {/* <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/wills" element={<Wills />} />
          <Route path="/beneficiaries" element={<Beneficiaries />} />
          <Route path="/documents" element={<Documents />} />
          <Route path="/assets" element={<Assets />} />
          <Route path="/contracts" element={<Contracts />} />
          <Route path="/transactions" element={<Transactions />} />
          <Route path="/settings" element={<Settings />} /> */}
          <Route path='/emergencyhelpline' element={<EmergencyHelpline />} />
          <Route path='/ambulance' element={<Ambulances />} />
          <Route path="/hospitals" element={<Hospitals />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
