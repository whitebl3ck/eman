import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  HomeIcon,
  UserGroupIcon,
  CalendarIcon,
  BuildingOffice2Icon,
  ArrowLeftOnRectangleIcon,
  Squares2X2Icon,
  UserCircleIcon,
  ArrowPathIcon
} from '@heroicons/react/24/outline';
import LogoutModal from './dashboard/LogoutModal';
// You may need to install @heroicons/react for these icons

const navItems = [
  {
    label: 'Dashboard',
    icon: Squares2X2Icon, // use as component
    to: (userType) => `/dashboard/${userType}`
  },
  {
    label: 'Switch Role',
    icon: ArrowPathIcon,
    action: 'switchRole'
  },
  {
    label: 'Manage Venues',
    icon: BuildingOffice2Icon,
    to: '/manage-venues',
    roles: ['venue_owner']
  },
  {
    label: 'Bookings',
    icon: CalendarIcon,
    to: '/bookings',
    roles: ['customer', 'venue_owner', 'planner']
  },
  {
    label: 'Profile',
    icon: UserCircleIcon,
    to: '/profile'
  },
  {
    label: 'Logout',
    icon: ArrowLeftOnRectangleIcon,
    action: 'logout'
  }
];

const Sidebar = ({ userType, onSwitchRole, onLogout }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNav = (item) => {
    if (item.action === 'logout') {
      if (onLogout) onLogout();
    } else if (item.action === 'switchRole') {
      if (onSwitchRole) onSwitchRole();
    } else if (item.to) {
      const to = typeof item.to === 'function' ? item.to(userType) : item.to;
      navigate(to);
    }
  };

  return (
    <aside className="fixed top-0 left-0 h-full z-50 group">
      <div className="bg-emerald-900 text-white flex flex-col shadow-lg h-full transition-all duration-300 w-24 group-hover:w-64">
        <div className="flex items-center justify-center h-24 border-b border-emerald-800 transition-all duration-300 group-hover:justify-start group-hover:px-6">
          <span className="text-3xl font-bold tracking-wide opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">EventMan</span>
          <span className="group-hover:hidden block"><Squares2X2Icon className="h-12 w-12" /></span>
        </div>
        <nav className="flex-1 py-6 px-2 space-y-2">
          {navItems.map((item) => {
            if (item.roles && !item.roles.includes(userType)) return null;
            const isActive = item.to && (typeof item.to === 'function' ? location.pathname === item.to(userType) : location.pathname === item.to);
            const Icon = item.icon;
            return (
              <button
                key={item.label}
                onClick={() => handleNav(item)}
                className={`flex items-center w-full py-8 rounded-lg transition-colors text-left gap-4 font-medium hover:bg-emerald-800 focus:outline-none ${isActive ? 'bg-emerald-800' : ''} group/sidebar-row justify-center group-hover:justify-start px-0 group-hover:px-4 pl-4`}
              >
                <span className="w-12 flex-shrink-0 flex items-center justify-center">
                  <Icon className="h-12 w-12 mx-auto" />
                </span>
                <span
                  className={
                    `overflow-hidden whitespace-nowrap text-lg transition-all duration-300 ` +
                    (isActive
                      ? 'opacity-100 w-auto'
                      : 'opacity-0 w-0 group-hover:opacity-100 group-hover:w-auto')
                  }
                >
                  {item.label}
                </span>
              </button>
            );
          })}
        </nav>
        <div className="p-4 text-xs text-emerald-200 opacity-70 hidden group-hover:block transition-all duration-300">
          &copy; {new Date().getFullYear()} EventMan. All rights reserved.
        </div>
      </div>
    </aside>
  );
};

export default Sidebar; 