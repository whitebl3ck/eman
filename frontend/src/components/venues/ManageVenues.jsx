import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import AddVenueModal from './AddVenueModal';

const ManageVenues = () => {
  const [showAddVenueModal, setShowAddVenueModal] = useState(false);
  const [venues, setVenues] = useState([]);
  const [loadingVenues, setLoadingVenues] = useState(true);
  const [venueError, setVenueError] = useState('');

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

  const handleEditVenue = (venue) => {
    console.log('Editing venue:', venue);
    // This will be implemented later
  };

  const handleDeleteVenue = async (venueId) => {
    console.log('Deleting venue:', venueId);
    // This will be implemented later
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Manage Your Venues</h1>
        <div>
          <Link to="/dashboard/venue_owner" className="bg-gray-200 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-300 mr-4">
            Back to Dashboard
          </Link>
          <button
            onClick={() => setShowAddVenueModal(true)}
            className="bg-emerald-600 text-white px-6 py-2 rounded-md hover:bg-emerald-700 transition"
          >
            Add New Venue
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

      <div>
        {loadingVenues ? (
          <div>Loading venues...</div>
        ) : venueError ? (
          <div className="text-red-600">{venueError}</div>
        ) : venues.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg shadow">
            <h2 className="text-xl font-semibold text-gray-700">No venues added yet.</h2>
            <p className="text-gray-500 mt-2">Click "Add New Venue" to get started.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {venues.map(venue => (
              <div
                key={venue._id}
                className="bg-white border border-gray-200 rounded-xl shadow-md p-6 flex flex-col transition-transform duration-200 hover:-translate-y-1 hover:shadow-lg"
              >
                <h3 className="text-lg font-bold mb-2 text-emerald-800">{venue.name}</h3>
                <div className="text-gray-700 mb-1 font-medium">{venue.address}</div>
                <div className="text-gray-500 mb-2">Capacity: {venue.capacity}</div>
                <div className="text-gray-600 mb-4 flex-1">{venue.description}</div>
                <div className="mt-4 flex justify-end space-x-2">
                  <button
                    onClick={() => handleEditVenue(venue)}
                    className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600 transition"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteVenue(venue._id)}
                    className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600 transition"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageVenues; 