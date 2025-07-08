import React from 'react';

const roles = [
  { type: 'customer', label: 'Customer', description: 'Book events and venues.' },
  { type: 'planner', label: 'Event Planner', description: 'Organize and manage events.' },
  { type: 'venue_owner', label: 'Venue Owner', description: 'List and manage venues.' },
];

const RoleSwitchModal = ({ isOpen, onClose, currentRole, onSelect }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 z-[9999] flex items-center justify-center">
      <div className="bg-white rounded-lg p-8 max-w-lg w-full shadow-xl">
        <h3 className="text-2xl font-bold text-center mb-6">Switch Role</h3>
        <p className="text-gray-600 text-center mb-8">Select a role to switch to. Your current role is highlighted.</p>
        <div className="flex flex-col gap-6 mb-8">
          {roles.map((role) => (
            <button
              key={role.type}
              onClick={() => onSelect(role.type)}
              disabled={role.type === currentRole}
              className={`flex flex-col items-center p-6 rounded-lg border-2 transition-all font-semibold focus:outline-none
                ${role.type === currentRole
                  ? 'border-emerald-600 bg-emerald-50 text-emerald-900 cursor-default shadow-lg'
                  : 'border-gray-200 bg-white hover:border-emerald-400 hover:bg-emerald-50 text-gray-700'}
              `}
            >
              <span className="text-xl mb-2">{role.label}</span>
              <span className="text-sm text-gray-500 text-center">{role.description}</span>
              {role.type === currentRole && (
                <span className="mt-4 px-3 py-1 text-xs rounded-full bg-emerald-600 text-white">Current</span>
              )}
            </button>
          ))}
        </div>
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default RoleSwitchModal; 