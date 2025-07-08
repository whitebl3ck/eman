import React, { useState, useEffect } from 'react';
import api from '../../api';

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

  const checkUsername = async (value) => {
    if (value.length > 2) {
      try {
        const response = await api.post('/auth/check-username', { username: value });
        if (response.data.exists) {
          setError('Username is already taken.');
        }
      } catch (error) {
        console.error('Error checking username:', error);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (error) return;
    setLoading(true);
    try {
      await api.post('/users/types', {
        type: role,
        username,
      });
      onSuccess();
    } catch (err) {
      console.error('Error setting username:', err);
      setError(err.response?.data?.message || 'An error occurred.');
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