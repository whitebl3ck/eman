import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './components/HomePage';
import Login from './components/auth/Login';
import SignUp from './components/auth/SignUp';
import CustomerDashboard from './components/dashboard/CustomerDashboard';
import PlannerDashboard from './components/dashboard/PlannerDashboard';
import VenueOwnerDashboard from './components/dashboard/VenueOwnerDashboard';
import ProtectedRoute from './components/auth/ProtectedRoute';
import AddVenue from './components/venues/AddVenue';
import ManageVenues from './components/venues/ManageVenues';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route
            path="/dashboard/customer"
            element={
              <ProtectedRoute>
                <CustomerDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/planner"
            element={
              <ProtectedRoute>
                <PlannerDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/venue_owner"
            element={
              <ProtectedRoute>
                <VenueOwnerDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/venues/add"
            element={
              <ProtectedRoute>
                <AddVenue />
              </ProtectedRoute>
            }
          />
          <Route
            path="/manage-venues"
            element={
              <ProtectedRoute>
                <ManageVenues />
              </ProtectedRoute>
            }
          />
          {/* Redirect any unknown routes to home page */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
