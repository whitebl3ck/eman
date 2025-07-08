import React from 'react';
import { useNavigate } from 'react-router-dom';

const dummyVenues = [
  {
    id: 1,
    name: 'Emerald Hall',
    address: '123 Main St, Cityville',
    capacity: 200,
    description: 'A beautiful hall perfect for weddings and large events.',
    image: 'https://via.placeholder.com/600x200?text=Emerald+Hall'
  },
  {
    id: 2,
    name: 'Skyline Venue',
    address: '456 Skyline Ave, Metropolis',
    capacity: 150,
    description: 'Modern venue with city views, ideal for corporate events.',
    image: 'https://via.placeholder.com/600x200?text=Skyline+Venue'
  },
  {
    id: 3,
    name: 'Sunset Gardens',
    address: '789 Sunset Blvd, Beachside',
    capacity: 100,
    description: 'Outdoor garden venue for intimate gatherings and parties.',
    image: 'https://via.placeholder.com/600x200?text=Sunset+Gardens'
  }
];

const ManageVenues = () => {
  const navigate = useNavigate();

  return (
    <div className="p-8 min-h-screen">
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-3xl font-bold text-gray-800">Manage Your Venues</h1>
        <button className="bg-emerald-600 text-white px-6 py-2 rounded-md hover:bg-emerald-700 transition">Add New Venue</button>
      </div>
      {dummyVenues.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg shadow">
          <h2 className="text-xl font-semibold text-gray-700">No venues added yet.</h2>
          <p className="text-gray-500 mt-2">Click "Add New Venue" to get started.</p>
        </div>
      ) : (
        <div className="space-y-8">
          {dummyVenues.map(venue => (
            <div
              key={venue.id}
              className="bg-white border border-gray-200 rounded-xl shadow-md p-0 flex flex-col cursor-pointer transition-transform duration-200 hover:-translate-y-1 hover:shadow-lg w-full mx-auto"
              onClick={() => navigate(`/venues/${venue.id}`)}
            >
              <img src={venue.image} alt={venue.name} className="w-full h-48 object-cover rounded-t-xl" />
              <div className="p-6 flex flex-col flex-1">
                <h3 className="text-lg font-bold mb-2 text-emerald-800">{venue.name}</h3>
                <div className="text-gray-700 mb-1 font-medium">{venue.address}</div>
                <div className="text-gray-500 mb-2">Capacity: {venue.capacity}</div>
                <div className="text-gray-600 mb-4 flex-1">{venue.description}</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ManageVenues; 