import React, { useEffect, useState } from 'react';
import DashboardLayout from './DashboardLayout';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import AddVenueModal from '../venues/AddVenueModal';

const VenueOwnerDashboard = () => {
  const [username, setUsername] = useState('');
  const [showAddVenueModal, setShowAddVenueModal] = useState(false);
  const [venues, setVenues] = useState([]);
  const [loadingVenues, setLoadingVenues] = useState(true);
  const [venueError, setVenueError] = useState('');
  const navigate = useNavigate();

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

  const fetchVenues = async () => {
    setLoadingVenues(true);
    setVenueError('');
    try {
      const response = await axios.get('http://localhost:5000/api/venues/my', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      setVenues(response.data.venues || []);
    } catch (err) {
      setVenueError('Failed to load venues');
    } finally {
      setLoadingVenues(false);
    }
  };

  useEffect(() => {
    fetchVenues();
  }, []);

  return (
    <DashboardLayout username={username}>
      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Total Venues */}
        <Link to="/manage-venues" className="bg-white overflow-hidden shadow rounded-lg hover:bg-gray-50 cursor-pointer">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg font-medium text-gray-900">Total Venues</h3>
            <div className="mt-4">
              <p className="text-3xl font-semibold text-gray-900">{venues.length}</p>
            </div>
          </div>
        </Link>

        {/* Booking Requests */}
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg font-medium text-gray-900">Booking Requests</h3>
            <div className="mt-4">
              <p className="text-gray-500">No new requests</p>
            </div>
          </div>
        </div>

        {/* Statistics */}
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg font-medium text-gray-900">Statistics</h3>
            <div className="mt-4 space-y-2">
              <p className="text-gray-500">Total Bookings: 0</p>
              <p className="text-gray-500">Total Revenue: $0</p>
              <p className="text-gray-500">Reviews: 0</p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-8">
        <h2 className="text-lg font-medium text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button
            onClick={() => setShowAddVenueModal(true)}
            className="bg-emerald-600 text-white px-4 py-2 rounded-md hover:bg-emerald-700"
          >
            Add Venue
          </button>
          <button className="bg-emerald-600 text-white px-4 py-2 rounded-md hover:bg-emerald-700">
            Manage Bookings
          </button>
          <button className="bg-emerald-600 text-white px-4 py-2 rounded-md hover:bg-emerald-700">
            View Reports
          </button>
        </div>
      </div>

      <AddVenueModal
        isOpen={showAddVenueModal}
        onClose={() => setShowAddVenueModal(false)}
        onSuccess={() => {
          setShowAddVenueModal(false);
          fetchVenues();
        }}
      />
    </DashboardLayout>
  );
};

export default VenueOwnerDashboard; 