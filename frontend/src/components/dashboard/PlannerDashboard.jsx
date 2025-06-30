import React, { useEffect, useState } from 'react';
import DashboardLayout from './DashboardLayout';
import axios from 'axios';

const PlannerDashboard = () => {
  const [username, setUsername] = useState('');

  useEffect(() => {
    const fetchUsername = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/users/types', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        const primaryType = response.data.userTypes?.find(type => type.isPrimary);
        setUsername(primaryType?.username || '');
      } catch (error) {
        setUsername('');
      }
    };
    fetchUsername();
  }, []);

  return (
    <DashboardLayout username={username}>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Active Events */}
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg font-medium text-gray-900">Active Events</h3>
            <div className="mt-4">
              <p className="text-gray-500">No active events</p>
            </div>
          </div>
        </div>

        {/* Upcoming Events */}
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg font-medium text-gray-900">Upcoming Events</h3>
            <div className="mt-4">
              <p className="text-gray-500">No upcoming events</p>
            </div>
          </div>
        </div>

        {/* Event Statistics */}
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg font-medium text-gray-900">Statistics</h3>
            <div className="mt-4 space-y-2">
              <p className="text-gray-500">Total Events: 0</p>
              <p className="text-gray-500">Total Attendees: 0</p>
              <p className="text-gray-500">Revenue: $0</p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-8">
        <h2 className="text-lg font-medium text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="bg-emerald-600 text-white px-4 py-2 rounded-md hover:bg-emerald-700">
            Create Event
          </button>
          <button className="bg-emerald-600 text-white px-4 py-2 rounded-md hover:bg-emerald-700">
            Manage Events
          </button>
          <button className="bg-emerald-600 text-white px-4 py-2 rounded-md hover:bg-emerald-700">
            View Reports
          </button>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default PlannerDashboard; 