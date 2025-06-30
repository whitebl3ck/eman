import React, { useState } from 'react';
import axios from 'axios';

const UsernameModal = ({ isOpen, onClose, role, onSuccess }) => {
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [isChecking, setIsChecking] = useState(false);

  const validateUsername = (username) => {
    if (username.length < 3) {
      return 'Username must be at least 3 characters long';
    }
    if (username.length > 30) {
      return 'Username must be less than 30 characters';
    }
    if (!/^[a-zA-Z0-9_]+$/.test(username)) {
      return 'Username can only contain letters, numbers, and underscores';
    }
    return null;
  };

  const checkUsernameAvailability = async (username) => {
    try {
      const response = await axios.post('http://localhost:5000/api/auth/check-username', { username });
      return !response.data.exists;
    } catch (error) {
      console.error('Username check error:', error);
      return true; // Don't block if check fails
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Validate username format
    const validationError = validateUsername(username);
    if (validationError) {
      setError(validationError);
      setLoading(false);
      return;
    }

    try {
      // Check username availability
      setIsChecking(true);
      const isAvailable = await checkUsernameAvailability(username);
      setIsChecking(false);

      if (!isAvailable) {
        setError('This username is already taken');
        setLoading(false);
        return;
      }

      // Add the role with username
      await axios.post('http://localhost:5000/api/users/types', {
        type: role,
        username,
        isPrimary: true // Set as primary role
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });

      onSuccess();
    } catch (err) {
      if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else {
        setError('Failed to set username. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 z-[9999]">
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="bg-white rounded-lg p-8 max-w-md w-full shadow-xl">
          <h3 className="text-2xl font-bold text-center mb-6">Choose Your Username</h3>
          <p className="text-gray-600 text-center mb-8">
            Enter a unique username for your {role} account. This will be your public identity.
          </p>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-50 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                <span className="block sm:inline">{error}</span>
              </div>
            )}
            
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                Username
              </label>
              <div className="mt-1">
                <input
                  id="username"
                  name="username"
                  type="text"
                  required
                  value={username}
                  onChange={(e) => {
                    setUsername(e.target.value);
                    setError(''); // Clear error when user types
                  }}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm"
                  placeholder={`Enter your ${role} username`}
                  disabled={loading || isChecking}
                />
              </div>
              <p className="mt-2 text-sm text-gray-500">
                Username must be 3-30 characters and can only contain letters, numbers, and underscores.
              </p>
            </div>

            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900"
                disabled={loading || isChecking}
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading || isChecking}
                className={`px-4 py-2 text-sm font-medium text-white bg-emerald-600 rounded-md hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 ${
                  (loading || isChecking) ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                {isChecking ? 'Checking...' : loading ? 'Setting Username...' : 'Continue'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UsernameModal; 