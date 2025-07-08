import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// import Navbar from './Navbar';

const HomePage = () => {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);
  const isAuthenticated = localStorage.getItem('token');

  const heroContent = [
    {
      title: "Trying to save a spot in your favorite events?",
      description: "Discover and book amazing events. From concerts to conferences, find the perfect event that matches your interests and preferences.",
      stats: [
        { number: "1000+", label: "Events Monthly" },
        { number: "50K+", label: "Happy Customers" },
        { number: "24/7", label: "Support" }
      ]
    },
    {
      title: "Want to organize your own event?",
      description: "Streamline your event planning process. Manage bookings, coordinate with venues, and create unforgettable experiences for your clients.",
      stats: [
        { number: "500+", label: "Active Planners" },
        { number: "100+", label: "Event Types" },
        { number: "99%", label: "Success Rate" }
      ]
    },
    {
      title: "Trying to rent your spaces out?",
      description: "Showcase your venue to a wide audience. Get bookings, manage availability, and grow your business with our comprehensive platform.",
      stats: [
        { number: "200+", label: "Venues Listed" },
        { number: "10K+", label: "Monthly Bookings" },
        { number: "4.9/5", label: "Venue Rating" }
      ]
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroContent.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [heroContent.length]);

  return (
    <div className="min-h-screen">
      {/* <Navbar /> */}
      
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-emerald-900 via-emerald-700 to-emerald-800 text-white min-h-screen flex items-center justify-center relative overflow-hidden pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
          <div className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)]">
            {heroContent.map((content, index) => (
              <div
                key={index}
                className={`w-full transition-all duration-1000 transform ${
                  currentSlide === index
                    ? 'opacity-100'
                    : 'opacity-0 absolute pointer-events-none'
                }`}
              > 
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-8 text-center max-w-4xl mx-auto">
                  {content.title}
                </h1>
                <p className="text-xl sm:text-2xl max-w-3xl mb-12 text-center mx-auto">
                  {content.description}
                </p>
                {!isAuthenticated && (
                  <div className="flex gap-6 justify-center">
                    <button 
                      onClick={() => navigate('/signup')}
                      className="bg-white text-emerald-800 px-10 py-4 rounded-full text-xl font-semibold hover:bg-opacity-0 hover:border-white border-2 hover:text-white transition"
                    >
                      Get Started
                    </button>
                    <button 
                      onClick={() => navigate('/login')}
                      className="border-2 border-white px-10 py-4 rounded-full text-xl font-semibold hover:bg-white hover:text-emerald-800 transition"
                    >
                      Login
                    </button>
                  </div>
                )}
                <div className="mt-16 grid grid-cols-3 gap-8 text-center max-w-4xl mx-auto">
                  {content.stats.map((stat, statIndex) => (
                    <div key={statIndex} className="relative">
                      <div className="relative rounded-lg">
                        <div className="p-6">
                          <h3 className="text-4xl font-bold mb-2">{stat.number}</h3>
                          <p className="text-lg">{stat.label}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-16 text-center text-3xl font-bold">
                  Your Events, Our Platform
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Slide Indicators */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
          {heroContent.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                currentSlide === index ? 'bg-white scale-125' : 'bg-white/50'
              }`}
            />
          ))}
        </div>
      </section>

      {/* About Us Section */}
      <section id="about" className="h-screen bg-white flex items-center">
        <div className="container mx-auto px-8 text-center">
          <h2 className="text-5xl font-bold mb-8">About Us</h2>
          <p className="text-2xl mb-12 max-w-3xl mx-auto">
            From booking a seat to planning a show or offering a space, we connect customers, event planners, and venue owners in one trusted event marketplace.
          </p>
          <div className="grid md:grid-cols-3 gap-12">
            <div className="text-center p-8 bg-gray-50 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="bg-emerald-100 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-8">
                <svg className="w-12 h-12 text-emerald-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-semibold mb-6">Our Vision</h3>
              <p className="text-lg text-gray-600">To create a world where organizing and attending events is effortless, enjoyable, and accessible to everyone.</p>
            </div>
            <div className="text-center p-8 bg-gray-50 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="bg-emerald-100 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-8">
                <svg className="w-12 h-12 text-emerald-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-2xl font-semibold mb-6">Our Mission</h3>
              <p className="text-lg text-gray-600">To empower event creators and venue owners while providing unforgettable experiences for event-goers.</p>
            </div>
            <div className="text-center p-8 bg-gray-50 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="bg-emerald-100 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-8">
                <svg className="w-12 h-12 text-emerald-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-2xl font-semibold mb-6">Our Values</h3>
              <p className="text-lg text-gray-600">Innovation, community, and excellence drive everything we do in the event industry.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="h-screen bg-gray-50 flex items-center">
        <div className="container mx-auto px-8">
          <h2 className="text-5xl font-bold text-center mb-4">Why Choose Us</h2>
          <p className="text-xl text-gray-600 text-center mb-16 max-w-3xl mx-auto">
            Experience the best event management platform with features designed to make your event journey seamless and successful.
          </p>
          <div className="grid md:grid-cols-3 gap-16">
            <div className="text-center p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="bg-emerald-100 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-8">
                <svg className="w-12 h-12 text-emerald-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-semibold mb-6">Easy Booking</h3>
              <p className="text-lg text-gray-600">Simple and secure booking process with instant confirmation and real-time availability updates.</p>
            </div>
            <div className="text-center p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="bg-emerald-100 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-8">
                <svg className="w-12 h-12 text-emerald-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-2xl font-semibold mb-6">Secure Payments</h3>
              <p className="text-lg text-gray-600">Multiple payment options with secure transactions and instant refund processing.</p>
            </div>
            <div className="text-center p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="bg-emerald-100 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-8">
                <svg className="w-12 h-12 text-emerald-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-semibold mb-6">Community Driven</h3>
              <p className="text-lg text-gray-600">Join a vibrant community of event enthusiasts and connect with like-minded people.</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="h-screen flex items-center bg-green-50">
        <div className="container mx-auto px-8">
          <h2 className="text-5xl font-bold text-center mb-4">How It Works</h2>
          <p className="text-xl text-gray-600 text-center mb-16 max-w-3xl mx-auto">
            Get started with our platform in four simple steps and begin your event journey today.
          </p>
          <div className="grid md:grid-cols-4 gap-12">
            <div className="text-center p-8 bg-gray-50 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="bg-emerald-800 text-white w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-8 text-3xl font-bold">1</div>
              <h3 className="text-2xl font-semibold mb-6">Create Account</h3>
              <p className="text-lg text-gray-600">Sign up in minutes with your email and get instant access to all features.</p>
            </div>
            <div className="text-center p-8 bg-gray-50 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="bg-emerald-800 text-white w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-8 text-3xl font-bold">2</div>
              <h3 className="text-2xl font-semibold mb-6">Browse Events</h3>
              <p className="text-lg text-gray-600">Explore our curated list of events and find the perfect match for your interests.</p>
            </div>
            <div className="text-center p-8 bg-gray-50 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="bg-emerald-800 text-white w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-8 text-3xl font-bold">3</div>
              <h3 className="text-2xl font-semibold mb-6">Book Tickets</h3>
              <p className="text-lg text-gray-600">Secure your spot with our easy booking process and multiple payment options.</p>
            </div>
            <div className="text-center p-8 bg-gray-50 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="bg-emerald-800 text-white w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-8 text-3xl font-bold">4</div>
              <h3 className="text-2xl font-semibold mb-6">Enjoy Event</h3>
              <p className="text-lg text-gray-600">Attend your chosen event and create unforgettable memories with others.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="footer" className="bg-green-950 text-white py-20">
        <div className="container mx-auto px-8">
          <div className="grid md:grid-cols-4 gap-12">
            <div>
              <h3 className="text-2xl font-bold mb-6">EventMan</h3>
              <p className="text-lg text-gray-400">Your one-stop platform for all event needs. Join us in creating unforgettable experiences.</p>
            </div>
            <div>
              <h4 className="text-xl font-semibold mb-6">Quick Links</h4>
              <ul className="space-y-4">
                <li><a href="#" className="text-lg text-gray-400 hover:text-white">About Us</a></li>
                <li><a href="#" className="text-lg text-gray-400 hover:text-white">Events</a></li>
                <li><a href="#" className="text-lg text-gray-400 hover:text-white">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-xl font-semibold mb-6">Support</h4>
              <ul className="space-y-4">
                <li><a href="#" className="text-lg text-gray-400 hover:text-white">Help Center</a></li>
                <li><a href="#" className="text-lg text-gray-400 hover:text-white">Terms of Service</a></li>
                <li><a href="#" className="text-lg text-gray-400 hover:text-white">Privacy Policy</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-xl font-semibold mb-6">Connect With Us</h4>
              <div className="flex space-x-6">
                <a href="#" className="text-gray-400 hover:text-white">
                  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-16 pt-8 text-center text-gray-400">
            <p className="text-lg">&copy; 2025 EventMan. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage; 