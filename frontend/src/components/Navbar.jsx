import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import UsernameModal from './auth/UsernameModal';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isAuthPage = location.pathname === '/login' || location.pathname === '/signup';
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));
  const [userTypes, setUserTypes] = useState([]);
  const [currentType, setCurrentType] = useState('');
  const [showRoleMenu, setShowRoleMenu] = useState(false);
  const [showUsernameModal, setShowUsernameModal] = useState(false);
  const [selectedRole, setSelectedRole] = useState('');
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isDashboard = location.pathname.startsWith('/dashboard/');

  useEffect(() => {
    if (isAuthenticated) {
      fetchUserTypes();
    }
  }, [isAuthenticated]);

  useEffect(() => {
    const handleAuthChange = () => {
      setIsAuthenticated(!!localStorage.getItem('token'));
    };
    window.addEventListener('storage', handleAuthChange);
    window.addEventListener('authChanged', handleAuthChange);
    return () => {
      window.removeEventListener('storage', handleAuthChange);
      window.removeEventListener('authChanged', handleAuthChange);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      // Change 80 to the height of your hero section if needed
      setScrolled(window.scrollY > 80);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const fetchUserTypes = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/users/types', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      console.log('User types response:', response.data);
      setUserTypes(response.data.userTypes || []);
      const primaryType = response.data.userTypes?.find(type => type.isPrimary)?.type;
      setCurrentType(primaryType || '');
    } catch (error) {
      console.error('Error fetching user types:', error);
    }
  };

  const handleRoleSelect = (type) => {
    const existingRole = userTypes.find(ut => ut.type === type);
    if (existingRole?.username) {
      // If role exists and has username, switch directly
      handleRoleSwitch(type);
    } else {
      // If role doesn't exist or has no username, show modal
      setSelectedRole(type);
      setShowUsernameModal(true);
      setShowRoleMenu(false);
    }
  };

  const handleRoleSwitch = async (type) => {
    try {
      await axios.put('http://localhost:5000/api/users/types/primary', 
        { type },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        }
      );
      setCurrentType(type);
      navigate(`/dashboard/${type}`);
    } catch (error) {
      console.error('Error switching role:', error);
    }
  };

  const handleUsernameSuccess = () => {
    setShowUsernameModal(false);
    fetchUserTypes(); // Refresh user types
    navigate(`/dashboard/${selectedRole}`);
  };

  const handleDashboardClick = () => {
    if (currentType) {
      navigate(`/dashboard/${currentType}`);
    } else {
      const firstType = userTypes[0]?.type;
      if (firstType) {
        navigate(`/dashboard/${firstType}`);
      }
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.dispatchEvent(new Event('authChanged'));
    navigate('/login');
  };

  // Debug log for current state
  console.log('Current userTypes:', userTypes);
  console.log('Current type:', currentType);

  return (
    <nav
      className={`fixed top-0 right-0 w-full z-[100] transition-colors duration-300
        ${isDashboard ? 'bg-emerald-800 text-emerald-100' : (scrolled ? 'bg-white text-emerald-900 shadow' : 'bg-transparent text-white')}
      `}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div 
            onClick={() => navigate('/')}
            className={`text-xl font-bold cursor-pointer flex-shrink-0 px-2 ${isDashboard ? 'text-white' : ''}`}
          >
            EventMan
          </div>

          {/* Hamburger for mobile */}
          <button
            className="lg:hidden p-2 focus:outline-none"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-8 ml-auto">
            {/* Always show landing page nav links */}
            {location.pathname === '/' && (
              <>
                <button
                  onClick={() => {
                    const element = document.getElementById('about');
                    element?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className={`${scrolled ? 'text-emerald-900' : ''} hover:text-emerald-300 dark:hover:text-emerald-700 transition-colors`}
                >
                  About Us
                </button>
                <button
                  onClick={() => {
                    const element = document.getElementById('features');
                    element?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className={`${scrolled ? 'text-emerald-900' : ''} hover:text-emerald-300 dark:hover:text-emerald-700 transition-colors`}
                >
                  Features
                </button>
                <button
                  onClick={() => {
                    const element = document.getElementById('how-it-works');
                    element?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className={`${scrolled ? 'text-emerald-900' : ''} hover:text-emerald-300 dark:hover:text-emerald-700 transition-colors`}
                >
                  How It Works
                </button>
              </>
            )}
            {/* Navigation Items */}
            {!isAuthPage && (
              isAuthenticated ? (
                <>
                  <button
                    onClick={handleDashboardClick}
                    className={`${scrolled ? 'text-emerald-900' : ''} hover:text-emerald-300 dark:hover:text-emerald-700 transition-colors`}
                  >
                    Dashboard
                  </button>
                  <div className="relative">
                    <button
                      onClick={() => setShowRoleMenu(!showRoleMenu)}
                      className={`flex items-center ${scrolled ? 'text-emerald-900' : ''} hover:text-emerald-300 dark:hover:text-emerald-700 transition-colors`}
                    >
                      <span>Switch Role</span>
                      <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    {showRoleMenu && (
                      <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg py-2 z-50 border border-gray-100">
                        <button
                          onClick={() => handleRoleSelect('customer')}
                          className={`w-full text-left px-4 py-3 text-sm flex items-center justify-between ${
                            currentType === 'customer'
                              ? 'bg-emerald-800 text-white font-medium'
                              : 'text-emerald-800 hover:bg-emerald-50'
                          }`}
                        >
                          <span>Customer</span>
                          {currentType === 'customer' && (
                            <svg className="w-4 h-4 text-emerald-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                            </svg>
                          )}
                        </button>
                        <button
                          onClick={() => handleRoleSelect('planner')}
                          className={`w-full text-left px-4 py-3 text-sm flex items-center justify-between ${
                            currentType === 'planner'
                              ? 'bg-emerald-800 text-white font-medium'
                              : 'text-emerald-800 hover:bg-emerald-50'
                          }`}
                        >
                          <span>Event Planner</span>
                          {currentType === 'planner' && (
                            <svg className="w-4 h-4 text-emerald-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                            </svg>
                          )}
                        </button>
                        <button
                          onClick={() => handleRoleSelect('venue_owner')}
                          className={`w-full text-left px-4 py-3 text-sm flex items-center justify-between ${
                            currentType === 'venue_owner'
                              ? 'bg-emerald-800 text-white font-medium'
                              : 'text-emerald-800 hover:bg-emerald-50'
                          }`}
                        >
                          <span>Venue Owner</span>
                          {currentType === 'venue_owner' && (
                            <svg className="w-4 h-4 text-emerald-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                            </svg>
                          )}
                        </button>
                      </div>
                    )}
                  </div>
                  <button
                    onClick={handleLogout}
                    className={`${scrolled ? 'text-emerald-900' : ''} hover:text-emerald-300 dark:hover:text-emerald-700 transition-colors`}
                  >
                    Logout
                  </button>
                </>
              ) : (
                <div className="flex items-center space-x-4 ml-4">
                  <button 
                    onClick={() => navigate('/login')}
                    className={`${scrolled ? 'text-emerald-900' : ''} hover:text-emerald-300 dark:hover:text-emerald-700 transition-colors`}
                  >
                    Login
                  </button>
                  <button 
                    onClick={() => navigate('/signup')}
                    className={`px-4 py-2 rounded-full transition-colors font-semibold
                      ${scrolled ? 'bg-emerald-800 text-white hover:bg-emerald-900' : 'bg-white text-emerald-800 hover:bg-emerald-50'}
                    `}
                  >
                    Sign Up
                  </button>
                </div>
              )
            )}
          </div>

          {/* Mobile Nav */}
          {mobileMenuOpen && (
            <div className={`lg:hidden absolute top-16 left-0 w-full bg-white text-emerald-900 shadow z-50 transition-all`}>
              <div className="flex flex-col items-start p-6 space-y-4">
                {location.pathname === '/' && (
                  <>
                    <button
                      onClick={() => {
                        setMobileMenuOpen(false);
                        const element = document.getElementById('about');
                        element?.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className="w-full text-left hover:text-emerald-700"
                    >
                      About Us
                    </button>
                    <button
                      onClick={() => {
                        setMobileMenuOpen(false);
                        const element = document.getElementById('features');
                        element?.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className="w-full text-left hover:text-emerald-700"
                    >
                      Features
                    </button>
                    <button
                      onClick={() => {
                        setMobileMenuOpen(false);
                        const element = document.getElementById('how-it-works');
                        element?.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className="w-full text-left hover:text-emerald-700"
                    >
                      How It Works
                    </button>
                  </>
                )}
                {!isAuthPage && (
                  isAuthenticated ? (
                    <>
                      <button
                        onClick={() => {
                          setMobileMenuOpen(false);
                          handleDashboardClick();
                        }}
                        className="w-full text-left hover:text-emerald-700"
                      >
                        Dashboard
                      </button>
                      <button
                        onClick={() => setShowRoleMenu(!showRoleMenu)}
                        className="w-full text-left hover:text-emerald-700"
                      >
                        Switch Role
                      </button>
                      <button
                        onClick={() => {
                          setMobileMenuOpen(false);
                          handleLogout();
                        }}
                        className="w-full text-left hover:text-emerald-700"
                      >
                        Logout
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => {
                          setMobileMenuOpen(false);
                          navigate('/login');
                        }}
                        className="w-full text-left hover:text-emerald-700"
                      >
                        Login
                      </button>
                      <button
                        onClick={() => {
                          setMobileMenuOpen(false);
                          navigate('/signup');
                        }}
                        className="w-full text-left hover:text-emerald-700"
                      >
                        Sign Up
                      </button>
                    </>
                  )
                )}
              </div>
            </div>
          )}

        </div>
      </div>
      {/* Username Modal */}
      <UsernameModal
        isOpen={showUsernameModal}
        onClose={() => setShowUsernameModal(false)}
        role={selectedRole}
        onSuccess={handleUsernameSuccess}
      />
    </nav>
  );
};

export default Navbar; 