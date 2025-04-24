// src/App.js
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

// Context
import { AuthProvider, useAuth } from './context/AuthContext';

// Components
import Header from './components/Header';
import Footer from './components/Footer';

// Pages
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import MembershipPlans from './pages/MembershipPlans';
import Profile from './pages/Profile';
import Dashboard from './pages/Dashboard';
import AdminPlans from './pages/admin/AdminPlans';
import AdminUsers from './pages/admin/AdminUsers';
import AdminSubscriptions from './pages/admin/AdminSubscriptions';
import Checkout from './pages/Checkout';
import CheckoutSuccess from './pages/CheckoutSuccess';
import CheckoutCancel from './pages/CheckoutCancel';
import MySubscriptions from './pages/MySubscriptions';
import NotFound from './pages/NotFound';

// Load Stripe
const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY || 'pk_test_your_stripe_test_key');

// Protected Route Component
const ProtectedRoute = ({ children, adminOnly = false }) => {
  const { currentUser, loading, isAdmin } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!currentUser) {
    return <Navigate to="/login" />;
  }

  if (adminOnly && !isAdmin()) {
    return <Navigate to="/dashboard" />;
  }

  return children;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="d-flex flex-column min-vh-100">
          <Header />
          <Container className="flex-grow-1 py-4">
            <Elements stripe={stripePromise}>
              <Routes>
                {/* Public Routes */}
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/plans" element={<MembershipPlans />} />
                
                {/* Protected Routes */}
                <Route path="/dashboard" element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                } />
                <Route path="/profile" element={
                  <ProtectedRoute>
                    <Profile />
                  </ProtectedRoute>
                } />
                <Route path="/subscriptions" element={
                  <ProtectedRoute>
                    <MySubscriptions />
                  </ProtectedRoute>
                } />
                <Route path="/checkout/:planId" element={
                  <ProtectedRoute>
                    <Checkout />
                  </ProtectedRoute>
                } />
                <Route path="/subscription/success" element={
                  <ProtectedRoute>
                    <CheckoutSuccess />
                  </ProtectedRoute>
                } />
                <Route path="/subscription/cancel" element={
                  <ProtectedRoute>
                    <CheckoutCancel />
                  </ProtectedRoute>
                } />
                
                {/* Admin Routes */}
                <Route path="/admin/plans" element={
                  <ProtectedRoute adminOnly={true}>
                    <AdminPlans />
                  </ProtectedRoute>
                } />
                <Route path="/admin/users" element={
                  <ProtectedRoute adminOnly={true}>
                    <AdminUsers />
                  </ProtectedRoute>
                } />
                <Route path="/admin/subscriptions" element={
                  <ProtectedRoute adminOnly={true}>
                    <AdminSubscriptions />
                  </ProtectedRoute>
                } />
                
                {/* 404 Route */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Elements>
          </Container>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
