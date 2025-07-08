import DashboardLayout from './DashboardLayout';

const VenueOwnerDashboard = () => {
  return (
    <DashboardLayout>
      <div className="min-h-screen w-full flex gap-16">
        {/* Main Content - Left Side */}
        <div className="flex-1 space-y-16">
          {/* Statistics Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-20">
            <div className="bg-white rounded-2xl shadow-xl p-10 flex flex-col items-center text-2xl">
              <div className="text-5xl font-extrabold text-emerald-700 mb-3">5</div>
              <div className="text-gray-600">Venues Listed</div>
            </div>
            <div className="bg-white rounded-2xl shadow-xl p-10 flex flex-col items-center text-2xl">
              <div className="text-5xl font-extrabold text-emerald-700 mb-3">120</div>
              <div className="text-gray-600">Total Bookings</div>
            </div>
            <div className="bg-white rounded-2xl shadow-xl p-10 flex flex-col items-center text-2xl">
              <div className="text-5xl font-extrabold text-emerald-700 mb-3">$8,500</div>
              <div className="text-gray-600">Total Revenue</div>
            </div>
            <div className="bg-white rounded-2xl shadow-xl p-10 flex flex-col items-center text-2xl">
              <div className="text-5xl font-extrabold text-emerald-700 mb-3">3</div>
              <div className="text-gray-600">Pending Requests</div>
            </div>
          </div>

          {/* Charts Section (Placeholders) */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div className="bg-white rounded-2xl shadow-xl p-10 min-h-[320px]">
              <h2 className="text-2xl font-bold mb-6">Bookings Over Time</h2>
              <div className="h-56 flex items-center justify-center text-gray-400 text-xl">(Chart Placeholder)</div>
            </div>
            <div className="bg-white rounded-2xl shadow-xl p-10 min-h-[320px]">
              <h2 className="text-2xl font-bold mb-6">Revenue Over Time</h2>
              <div className="h-56 flex items-center justify-center text-gray-400 text-xl">(Chart Placeholder)</div>
            </div>
          </div>

          {/* Recent Bookings */}
          <div className="bg-white rounded-2xl shadow-xl p-10">
            <h2 className="text-2xl font-bold mb-6">Recent Bookings</h2>
            <table className="w-full text-left text-lg">
              <thead>
                <tr className="text-gray-500 text-base">
                  <th className="py-3">Event</th>
                  <th className="py-3">Date</th>
                  <th className="py-3">Venue</th>
                  <th className="py-3">Status</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="py-3">Wedding Reception</td>
                  <td className="py-3">2024-07-10</td>
                  <td className="py-3">Emerald Hall</td>
                  <td className="py-3 text-emerald-600 font-semibold">Confirmed</td>
                </tr>
                <tr>
                  <td className="py-3">Corporate Meetup</td>
                  <td className="py-3">2024-07-12</td>
                  <td className="py-3">Skyline Venue</td>
                  <td className="py-3 text-yellow-600 font-semibold">Pending</td>
                </tr>
                <tr>
                  <td className="py-3">Birthday Party</td>
                  <td className="py-3">2024-07-15</td>
                  <td className="py-3">Sunset Gardens</td>
                  <td className="py-3 text-emerald-600 font-semibold">Confirmed</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Reviews & Business Tips */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div className="bg-white rounded-2xl shadow-xl p-10">
              <h2 className="text-2xl font-bold mb-6">Recent Reviews</h2>
              <ul className="space-y-6 text-lg">
                <li className="border-b pb-4">
                  <div className="font-semibold">John Doe</div>
                  <div className="text-base text-gray-500">"Great venue, very clean and well managed!"</div>
                  <div className="text-base text-yellow-500">★★★★★</div>
                </li>
                <li className="border-b pb-4">
                  <div className="font-semibold">Jane Smith</div>
                  <div className="text-base text-gray-500">"Staff was helpful and the event went smoothly."</div>
                  <div className="text-base text-yellow-500">★★★★☆</div>
                </li>
              </ul>
            </div>
            <div className="bg-white rounded-2xl shadow-xl p-10 flex flex-col justify-between">
              <h2 className="text-2xl font-bold mb-6">Business Growth Tips</h2>
              <ul className="list-disc pl-8 space-y-4 text-lg text-gray-700">
                <li>Respond to booking requests quickly to increase your confirmation rate.</li>
                <li>Encourage guests to leave reviews after their events.</li>
                <li>Keep your venue details and photos up to date for better visibility.</li>
                <li>Offer seasonal discounts to attract more bookings.</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Quick Actions - Right Side */}
        <div className="w-72 flex-shrink-0">
          <div className="bg-white rounded-2xl shadow-xl p-10 flex flex-col gap-6 sticky top-12">
            <h2 className="text-2xl font-bold mb-4">Quick Actions</h2>
            <button className="bg-emerald-600 text-white px-6 py-4 rounded-lg text-lg hover:bg-emerald-700 transition">Add New Venue</button>
            <button className="bg-emerald-100 text-emerald-800 px-6 py-4 rounded-lg text-lg hover:bg-emerald-200 transition">Manage Venues</button>
            <button className="bg-emerald-100 text-emerald-800 px-6 py-4 rounded-lg text-lg hover:bg-emerald-200 transition">View Booking Requests</button>
            <button className="bg-emerald-100 text-emerald-800 px-6 py-4 rounded-lg text-lg hover:bg-emerald-200 transition">View Reviews</button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default VenueOwnerDashboard; 