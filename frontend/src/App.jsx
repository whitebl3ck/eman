import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import HomePage from './components/HomePage';
import Login from './components/auth/Login';
import SignUp from './components/auth/SignUp';
import CustomerDashboard from './components/dashboard/CustomerDashboard';
import PlannerDashboard from './components/dashboard/PlannerDashboard';
import VenueOwnerDashboard from './components/dashboard/VenueOwnerDashboard';
import ProtectedRoute from './components/auth/ProtectedRoute';
import AddVenue from './components/venues/AddVenue';
import ManageVenues from './components/venues/ManageVenues';
import Bookings from './pages/Bookings';
import api from './api';
import UsernameModal from './components/auth/UsernameModal';
import RoleSwitchModal from './components/RoleSwitchModal';
import LogoutModal from './components/dashboard/LogoutModal';
import Profile from './pages/Profile';
import VenueDetails from './components/venues/VenueDetails';

function AppRoutes() {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));
  const [userType, setUserType] = useState('');
  const [userTypes, setUserTypes] = useState([]); // Store all user roles
  const [showRoleSwitchModal, setShowRoleSwitchModal] = useState(false);
  const [showUsernameModal, setShowUsernameModal] = useState(false);
  const [selectedRole, setSelectedRole] = useState('');
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const publicRoutes = ['/', '/login', '/signup'];
  const isPublicRoute = publicRoutes.includes(location.pathname);

  useEffect(() => {
    const handleAuthChange = () => {
      setIsAuthenticated(!!localStorage.getItem('token'));
    };
    window.addEventListener('storage', handleAuthChange);
    window.addEventListener('authChanged', handleAuthChange);
    return () => {
      window.removeEventListener('storage', handleAuthChange);
      window.removeEventListener('authChanged', handleAuthChange);
    };
  }, []);

  useEffect(() => {
    const fetchUserType = async () => {
      if (isAuthenticated) {
        try {
          const response = await api.get('/users/types');
          const primaryType = response.data.userTypes?.find(type => type.isPrimary)?.type;
          setUserType(primaryType || '');
          setUserTypes(response.data.userTypes || []);
        } catch (err) {
          setUserType('');
          setUserTypes([]);
        }
      } else {
        setUserType('');
        setUserTypes([]);
      }
    };
    fetchUserType();
  }, [isAuthenticated]);

  // Handler to open the role switch modal
  const handleSwitchRole = () => {
    setShowRoleSwitchModal(true);
  };

  // Handler for selecting a role in the modal
  const handleRoleSelect = async (role) => {
    setSelectedRole(role);
    setShowRoleSwitchModal(false);
    if (role === userType) return; // Already current role
    const existingRole = userTypes.find(ut => ut.type === role);
    if (existingRole && existingRole.username) {
      // Switch directly
      try {
        await api.put('/users/types/primary', { type: role });
        navigate(`/dashboard/${role}`); // Redirect to the dashboard of the selected role
      } catch (err) {
        alert('Error switching role.');
      }
    } else {
      // Show username modal
      setShowUsernameModal(true);
    }
  };

  const handleUsernameSuccess = () => {
    setShowUsernameModal(false);
    window.location.reload(); // Or refetch user type, or navigate as needed
  };

  // Logout logic
  const handleLogout = () => {
    setShowLogoutModal(true);
  };
  const confirmLogout = () => {
    localStorage.removeItem('token');
    window.dispatchEvent(new Event('authChanged'));
    setShowLogoutModal(false);
    window.location.href = '/'; // Redirect to landing page
  };

  return (
    <div className="min-h-screen">
      {isPublicRoute ? (
        <Navbar />
      ) : (
        isAuthenticated && <Sidebar userType={userType} onSwitchRole={handleSwitchRole} onLogout={handleLogout} />
      )}
      <div className={isAuthenticated && !isPublicRoute ? 'pl-24 min-h-screen' : 'min-h-screen'}>
        <Routes>
          <Route path="/" element={
            isAuthenticated
              ? <Navigate to={userType ? `/dashboard/${userType}` : "/dashboard/customer"} replace />
              : <HomePage />
          } />
          <Route path="/login" element={
            isAuthenticated
              ? <Navigate to={userType ? `/dashboard/${userType}` : "/dashboard/customer"} replace />
              : <Login />
          } />
          <Route path="/signup" element={
            isAuthenticated
              ? <Navigate to={userType ? `/dashboard/${userType}` : "/dashboard/customer"} replace />
              : <SignUp />
          } />
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
          <Route
            path="/bookings"
            element={
              <ProtectedRoute>
                <Bookings />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/venues/:id"
            element={
              <ProtectedRoute>
                <VenueDetails />
              </ProtectedRoute>
            }
          />
          {/* Redirect any unknown routes to home page */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
      <RoleSwitchModal
        isOpen={showRoleSwitchModal}
        onClose={() => setShowRoleSwitchModal(false)}
        currentRole={userType}
        onSelect={handleRoleSelect}
      />
      <UsernameModal
        isOpen={showUsernameModal}
        onClose={() => setShowUsernameModal(false)}
        role={selectedRole}
        onSuccess={handleUsernameSuccess}
      />
      <LogoutModal
        isOpen={showLogoutModal}
        onCancel={() => setShowLogoutModal(false)}
        onConfirm={confirmLogout}
      />
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppRoutes />
    </Router>
  );
}

export default App;
