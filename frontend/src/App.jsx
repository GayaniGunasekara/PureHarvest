// src/App.jsx
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import FarmerDashboard from './pages/FarmerDashboard';
import SellerDashboard from './pages/SellerDashboard';
import CustomerDashboard from './pages/CustomerDashboard';
import DriverDashboard from './pages/DriverDashboard';
import RoleNav from './components/RoleNav';
import { getUserFromToken } from './utils/auth';

function ProtectedRoute({ allowed, children }) {
  const user = getUserFromToken();
  if (!user) return <Navigate to="/login" replace />;
  if (allowed && !allowed.includes(user.role)) return <Navigate to="/" replace />;
  return children;
}

export default function App() {
  const user = getUserFromToken();
  return (
    <BrowserRouter>
      <RoleNav user={user} />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* If you add more roles on the backend, also add them here */}
        <Route path="/Farmer" element={<ProtectedRoute allowed={['Farmer']}><FarmerDashboard /></ProtectedRoute>} />
        <Route path="/FertilizerSeller" element={<ProtectedRoute allowed={['FertilizerSeller']}><SellerDashboard /></ProtectedRoute>} />
        <Route path="/Customer" element={<ProtectedRoute allowed={['Customer']}><CustomerDashboard /></ProtectedRoute>} />
        <Route path="/Driver" element={<ProtectedRoute allowed={['Driver']}><DriverDashboard /></ProtectedRoute>} />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
