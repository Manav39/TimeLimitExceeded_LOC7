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
import Register from './pages/Register';

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

  return (
    <div className={`flex min-h-screen`}>
      {(!isHomePage && !isRegisterPage) && <Sidebar />}
      <main className="flex-1 overflow-y-auto">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/register" element={<Register />} />
          {/* <Router path="/register" element={<Register/>}/> */}
          
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/wills" element={<Wills />} />
          <Route path="/beneficiaries" element={<Beneficiaries />} />
          <Route path="/documents" element={<Documents />} />
          <Route path="/assets" element={<Assets />} />
          <Route path="/contracts" element={<Contracts />} />
          <Route path="/transactions" element={<Transactions />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
