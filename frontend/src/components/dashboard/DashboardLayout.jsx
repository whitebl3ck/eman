import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LogoutModal from './LogoutModal';

const DashboardLayout = ({ children, username }) => {
  const navigate = useNavigate();
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const handleLogout = () => {
    setShowLogoutModal(true);
  };

  const confirmLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className="min-h-screen">
      {/* Main Content */}
      <div className="max-w-none py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <h1 className="text-2xl font-semibold text-gray-900 mb-6">
            {username ? `Welcome, ${username}!` : 'Welcome!'}
          </h1>
          {children}
        </div>
      </div>
      <LogoutModal
        isOpen={showLogoutModal}
        onCancel={() => setShowLogoutModal(false)}
        onConfirm={confirmLogout}
      />
    </div>
  );
};

export default DashboardLayout; 