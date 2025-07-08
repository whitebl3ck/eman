import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';

// Dummy data for demonstration
const dummyVenues = [
  {
    id: 1,
    name: 'Emerald Hall',
    address: '123 Main St, Cityville',
    capacity: 200,
    description: 'A beautiful hall perfect for weddings and large events.',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80',
      'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80',
      'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=400&q=80',
      'https://images.unsplash.com/photo-1521737852567-6949f3f9f2b5?auto=format&fit=crop&w=400&q=80'
    ],
    features: ['Stage', 'Sound System', 'Parking', 'Catering Available'],
    price: '$2,000/day'
  },
  {
    id: 2,
    name: 'Skyline Venue',
    address: '456 Skyline Ave, Metropolis',
    capacity: 150,
    description: 'Modern venue with city views, ideal for corporate events.',
    image: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80',
      'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=400&q=80',
      'https://images.unsplash.com/photo-1465101178521-c1a9136a3b99?auto=format&fit=crop&w=400&q=80',
      'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80'
    ],
    features: ['Rooftop', 'WiFi', 'Bar', 'Projector'],
    price: '$1,500/day'
  },
  {
    id: 3,
    name: 'Sunset Gardens',
    address: '789 Sunset Blvd, Beachside',
    capacity: 100,
    description: 'Outdoor garden venue for intimate gatherings and parties.',
    image: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80',
      'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=400&q=80',
      'https://images.unsplash.com/photo-1465101178521-c1a9136a3b99?auto=format&fit=crop&w=400&q=80',
      'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80'
    ],
    features: ['Garden', 'Gazebo', 'Dance Floor'],
    price: '$1,200/day'
  }
];

const VenueDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const venue = dummyVenues.find(v => v.id === Number(id));

  if (!venue) {
    return (
      <div className="p-8 min-h-screen flex items-center justify-center">
        <div className="text-2xl text-gray-600">Venue not found.</div>
      </div>
    );
  }

  return (
    <div className="p-0 min-h-screen">
      <img src={venue.image} alt={venue.name} className="w-full h-[32rem] object-cover overflow-hidden" />
      {/* Gallery */}
      <div className="px-8 py-6 max-w-5xl">
        <div className="flex gap-4 mb-10">
          {venue.gallery.map((img, idx) => (
            <img key={idx} src={img} alt={venue.name + ' gallery'} className="w-1/4 h-32 object-cover rounded-lg shadow" />
          ))}
        </div>
      </div>
      <div className="px-8 py-12 max-w-5xl">
        <h1 className="text-5xl font-extrabold text-emerald-800 mb-6">{venue.name}</h1>
        <div className="text-gray-700 mb-3 text-2xl font-semibold">{venue.address}</div>
        <div className="text-gray-500 mb-3 text-xl">Capacity: {venue.capacity}</div>
        <div className="text-gray-600 mb-8 text-2xl">{venue.description}</div>
        <div className="mb-8">
          <span className="font-bold text-gray-700 text-2xl">Features:</span>
          <ul className="list-disc pl-8 text-gray-700 text-xl mt-2">
            {venue.features.map((feature, idx) => (
              <li key={idx}>{feature}</li>
            ))}
          </ul>
        </div>
        <div className="mb-10 text-3xl font-bold text-emerald-700">Price: {venue.price}</div>
        <div className="flex gap-6">
          <button className="bg-blue-500 text-white px-8 py-3 rounded text-xl font-semibold hover:bg-blue-600 transition">Edit</button>
          <button className="bg-red-500 text-white px-8 py-3 rounded text-xl font-semibold hover:bg-red-600 transition">Delete</button>
          <button className="bg-gray-200 text-gray-700 px-8 py-3 rounded text-xl font-semibold hover:bg-gray-300 transition ml-auto" onClick={() => navigate(-1)}>Back</button>
        </div>
      </div>
    </div>
  );
};

export default VenueDetails; 