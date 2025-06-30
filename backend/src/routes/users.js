const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Middleware to verify JWT token
const auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
      return res.status(401).json({ message: 'No token, authorization denied' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
    const user = await User.findById(decoded.userId);
    
    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Token is not valid' });
  }
};

// Get user types
router.get('/types', auth, async (req, res) => {
  try {
    res.json({ userTypes: req.user.userTypes });
  } catch (error) {
    console.error('Get user types error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Add user type
router.post('/types', auth, async (req, res) => {
  try {
    const { type } = req.body;
    
    if (!['customer', 'planner', 'venue_owner'].includes(type)) {
      return res.status(400).json({ message: 'Invalid user type' });
    }

    await req.user.addUserType(type);
    
    res.json({ 
      message: 'User type added successfully',
      userTypes: req.user.userTypes
    });
  } catch (error) {
    console.error('Add user type error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Remove user type
router.delete('/types/:type', auth, async (req, res) => {
  try {
    const { type } = req.params;
    
    if (!['customer', 'planner', 'venue_owner'].includes(type)) {
      return res.status(400).json({ message: 'Invalid user type' });
    }

    await req.user.removeUserType(type);
    
    res.json({ 
      message: 'User type removed successfully',
      userTypes: req.user.userTypes
    });
  } catch (error) {
    console.error('Remove user type error:', error);
    res.status(500).json({ message: error.message || 'Server error' });
  }
});

// Set primary user type
router.put('/types/primary', auth, async (req, res) => {
  try {
    const { type } = req.body;
    
    if (!['customer', 'planner', 'venue_owner'].includes(type)) {
      return res.status(400).json({ message: 'Invalid user type' });
    }

    await req.user.setPrimaryUserType(type);
    
    res.json({ 
      message: 'Primary user type updated successfully',
      userTypes: req.user.userTypes
    });
  } catch (error) {
    console.error('Set primary user type error:', error);
    res.status(500).json({ message: error.message || 'Server error' });
  }
});

// Update user profile for specific type
router.put('/profiles/:type', auth, async (req, res) => {
  try {
    const { type } = req.params;
    const profileData = req.body;

    if (!['customer', 'planner', 'venue_owner'].includes(type)) {
      return res.status(400).json({ message: 'Invalid user type' });
    }

    if (!req.user.userTypes.some(ut => ut.type === type)) {
      return res.status(400).json({ message: 'User type not found' });
    }

    req.user.profiles[type] = {
      ...req.user.profiles[type],
      ...profileData,
      updatedAt: new Date()
    };

    await req.user.save();
    
    res.json({ 
      message: 'Profile updated successfully',
      profile: req.user.profiles[type]
    });
  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router; 