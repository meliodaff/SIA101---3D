import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Inventory from './pages/Inventory';
import Procurement from './pages/Procurement';
import Dashboard from './pages/Dashboard';
import Requisitions from './pages/Requisitions';
import Suppliers from './pages/Suppliers';
import Analytics from './pages/Analytics';
import Departments from './pages/Departments';
import Reports from './pages/Reports';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        {/* Remove Navbars from here since it's already in Inventory */}
        <Routes>
          <Route path="/" element={<Inventory />} />
          <Route path="/inventory" element={<Inventory />} />
          <Route path="/" element={<Procurement />} />
          <Route path="/procurement" element={<Procurement />} />
          <Route path="/" element={<Dashboard />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/" element={<Requisitions />} />
          <Route path="/requisitions" element={<Requisitions />} />
          <Route path="/" element={<Suppliers />} />
          <Route path="/suppliers" element={<Suppliers />} />
          <Route path="/" element={<Analytics />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/" element={<Departments />} />
          <Route path="/departments" element={<Departments />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/" element={<Reports />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;