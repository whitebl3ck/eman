import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import UsernameModal from './UsernameModal';

const SignUp = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [showUserTypeModal, setShowUserTypeModal] = useState(false);
  const [showUsernameModal, setShowUsernameModal] = useState(false);
  const [selectedRole, setSelectedRole] = useState('');
  const [modalLoading, setModalLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    // Clear errors when user types
    if (name === 'email') {
      setEmailError('');
    } else if (name === 'password') {
      setPasswordError('');
    } else if (name === 'confirmPassword') {
      setConfirmPasswordError('');
    }
  };

  const checkEmail = async (email) => {
    try {
      const response = await axios.post('http://localhost:5000/api/auth/check-email', { email });
      if (response.data.exists) {
        setEmailError('Email already registered');
        return false;
      }
      return true;
    } catch (error) {
      console.error('Email check error:', error);
      return true; // Don't block signup attempt if check fails
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setEmailError('');
    setPasswordError('');
    setConfirmPasswordError('');
    setLoading(true);

    // Validate name
    if (!formData.name.trim()) {
      setError('Name is required');
      setLoading(false);
      return;
    }

    // Validate password match
    if (formData.password !== formData.confirmPassword) {
      setConfirmPasswordError('Passwords do not match');
      setLoading(false);
      return;
    }

    try {
      // Check if email exists first
      const emailAvailable = await checkEmail(formData.email);
      if (!emailAvailable) {
        setLoading(false);
        return;
      }

      // Signup request
      const response = await axios.post('http://localhost:5000/api/auth/signup', {
        name: formData.name,
        email: formData.email,
        password: formData.password
      });

      // Store the token
      localStorage.setItem('token', response.data.token);
      
      // Show user type selection modal
      setShowUserTypeModal(true);
    } catch (err) {
      console.error('Signup error:', err);
      
      if (err.response?.data?.field === 'email') {
        setEmailError(err.response.data.message);
      } else if (err.response?.data?.field === 'password') {
        setPasswordError(err.response.data.message);
      } else if (err.response?.data?.field === 'confirmPassword') {
        setConfirmPasswordError(err.response.data.message);
      } else if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else if (err.message === 'Network Error') {
        setError('Unable to connect to the server. Please check your internet connection.');
      } else {
        setError('An error occurred during signup. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleUserTypeSelect = (userType) => {
    setSelectedRole(userType);
    setShowUserTypeModal(false);
    setShowUsernameModal(true);
  };

  const handleUsernameSuccess = () => {
    setShowUsernameModal(false);
    navigate(`/dashboard/${selectedRole}`);
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Create your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Or{' '}
            <button
              onClick={() => navigate('/login')}
              className="font-medium text-emerald-600 hover:text-emerald-500"
            >
              sign in to your account
            </button>
          </p>
        </div>

        <form className="space-y-6" onSubmit={handleSubmit}>
          {error && (
            <div className="bg-red-50 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
              <span className="block sm:inline">{error}</span>
            </div>
          )}

          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Full name
            </label>
            <div className="mt-1">
              <input
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                required
                value={formData.name}
                onChange={handleChange}
                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm"
              />
            </div>
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email address
            </label>
            <div className="mt-1">
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={formData.email}
                onChange={handleChange}
                className={`appearance-none block w-full px-3 py-2 border ${
                  emailError ? 'border-red-300' : 'border-gray-300'
                } rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm`}
              />
              {emailError && (
                <p className="mt-2 text-sm text-red-600">{emailError}</p>
              )}
            </div>
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <div className="mt-1">
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                required
                value={formData.password}
                onChange={handleChange}
                className={`appearance-none block w-full px-3 py-2 border ${
                  passwordError ? 'border-red-300' : 'border-gray-300'
                } rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm`}
              />
              {passwordError && (
                <p className="mt-2 text-sm text-red-600">{passwordError}</p>
              )}
            </div>
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
              Confirm password
            </label>
            <div className="mt-1">
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                autoComplete="new-password"
                required
                value={formData.confirmPassword}
                onChange={handleChange}
                className={`appearance-none block w-full px-3 py-2 border ${
                  confirmPasswordError ? 'border-red-300' : 'border-gray-300'
                } rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm`}
              />
              {confirmPasswordError && (
                <p className="mt-2 text-sm text-red-600">{confirmPasswordError}</p>
              )}
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 ${
                loading ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {loading ? 'Creating account...' : 'Create account'}
            </button>
          </div>
        </form>
      </div>

      {/* User Type Selection Modal */}
      {showUserTypeModal && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-8 max-w-md w-full">
            <h3 className="text-2xl font-bold text-center mb-6">Choose Your Role</h3>
            <p className="text-gray-600 text-center mb-8">
              Select how you'll use EventMan. You can add more roles later from your dashboard.
            </p>
            <div className="space-y-4">
              <button
                onClick={() => handleUserTypeSelect('customer')}
                disabled={modalLoading}
                className={`w-full p-4 border-2 border-emerald-600 rounded-lg hover:bg-emerald-50 transition-colors ${
                  modalLoading ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                <h4 className="font-semibold text-lg mb-2">Customer</h4>
                <p className="text-gray-600">I want to discover and book events</p>
              </button>
              <button
                onClick={() => handleUserTypeSelect('planner')}
                disabled={modalLoading}
                className={`w-full p-4 border-2 border-emerald-600 rounded-lg hover:bg-emerald-50 transition-colors ${
                  modalLoading ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                <h4 className="font-semibold text-lg mb-2">Event Planner</h4>
                <p className="text-gray-600">I want to organize and manage events</p>
              </button>
              <button
                onClick={() => handleUserTypeSelect('venue_owner')}
                disabled={modalLoading}
                className={`w-full p-4 border-2 border-emerald-600 rounded-lg hover:bg-emerald-50 transition-colors ${
                  modalLoading ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                <h4 className="font-semibold text-lg mb-2">Venue Owner</h4>
                <p className="text-gray-600">I want to list and manage my venues</p>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Username Modal */}
      <UsernameModal
        isOpen={showUsernameModal}
        onClose={() => setShowUsernameModal(false)}
        role={selectedRole}
        onSuccess={handleUsernameSuccess}
      />
    </div>
  );
};

export default SignUp; 