const User = require('../models/User');

// Get user types
exports.getUserTypes = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({
      userTypes: user.userTypes
    });
  } catch (error) {
    console.error('Error in getUserTypes:', error);
    res.status(500).json({ message: 'Error fetching user types' });
  }
};

// Add user type
exports.addUserType = async (req, res) => {
  try {
    const { type, username } = req.body;
    
    if (!type || !username) {
      return res.status(400).json({ 
        message: 'Both type and username are required',
        field: !type ? 'type' : 'username'
      });
    }

    if (!['customer', 'planner', 'venue_owner'].includes(type)) {
      return res.status(400).json({ 
        message: 'Invalid user type',
        field: 'type'
      });
    }

    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    try {
      const userType = await user.addUserType(type, username);
      res.json({ 
        message: 'User type added successfully', 
        userType 
      });
    } catch (error) {
      // Handle specific validation errors
      if (error.message.includes('Username')) {
        return res.status(400).json({ 
          message: error.message,
          field: 'username'
        });
      }
      throw error;
    }
  } catch (error) {
    console.error('Error in addUserType:', error);
    res.status(500).json({ 
      message: error.message || 'Error adding user type',
      field: error.field
    });
  }
};

// Set primary user type
exports.setPrimaryUserType = async (req, res) => {
  try {
    const { type } = req.body;
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const userType = user.userTypes.find(ut => ut.type === type);
    if (!userType) {
      return res.status(404).json({ message: 'User type not found' });
    }

    // Update all user types
    user.userTypes.forEach(ut => {
      ut.isPrimary = ut.type === type;
    });

    await user.save();
    res.json({ message: 'Primary user type updated successfully' });
  } catch (error) {
    console.error('Error in setPrimaryUserType:', error);
    res.status(500).json({ message: 'Error updating primary user type' });
  }
};

// Remove user type
exports.removeUserType = async (req, res) => {
  try {
    const { type } = req.params;
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const typeIndex = user.userTypes.findIndex(ut => ut.type === type);
    if (typeIndex === -1) {
      return res.status(404).json({ message: 'User type not found' });
    }

    // If removing primary type, make another type primary if available
    if (user.userTypes[typeIndex].isPrimary && user.userTypes.length > 1) {
      const nextType = user.userTypes.find(ut => ut.type !== type);
      if (nextType) {
        nextType.isPrimary = true;
      }
    }

    user.userTypes.splice(typeIndex, 1);
    await user.save();
    res.json({ message: 'User type removed successfully' });
  } catch (error) {
    console.error('Error in removeUserType:', error);
    res.status(500).json({ message: 'Error removing user type' });
  }
};

// Update username for a role
exports.updateRoleUsername = async (req, res) => {
  try {
    const { type, username } = req.body;
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const userType = user.userTypes.find(ut => ut.type === type);
    if (!userType) {
      return res.status(404).json({ message: 'User type not found' });
    }

    // Check if username is already taken
    if (username) {
      const existingUser = await User.findOne({
        'userTypes.username': username,
        _id: { $ne: user._id }
      });

      if (existingUser) {
        return res.status(400).json({ message: 'Username is already taken' });
      }
    }

    userType.username = username;
    await user.save();
    res.json({ message: 'Username updated successfully', userType });
  } catch (error) {
    console.error('Error in updateRoleUsername:', error);
    res.status(500).json({ message: 'Error updating username' });
  }
}; 