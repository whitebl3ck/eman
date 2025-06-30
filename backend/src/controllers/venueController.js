const Venue = require('../models/Venue');

exports.createVenue = async (req, res) => {
  try {
    const { name, address, description, capacity } = req.body;
    
    // Validate required fields
    if (!name || !address || !capacity) {
      return res.status(400).json({ 
        message: 'Name, address, and capacity are required' 
      });
    }

    // Validate capacity is a number
    const capacityNum = parseInt(capacity);
    if (isNaN(capacityNum) || capacityNum <= 0) {
      return res.status(400).json({ 
        message: 'Capacity must be a positive number' 
      });
    }

    const venue = new Venue({
      name,
      address,
      description,
      capacity: capacityNum,
      owner: req.user.id
    });
    
    await venue.save();
    res.status(201).json({ message: 'Venue created successfully', venue });
  } catch (error) {
    console.error('Create venue error:', error);
    if (error.name === 'ValidationError') {
      return res.status(400).json({ 
        message: 'Validation error', 
        details: Object.values(error.errors).map(err => err.message) 
      });
    }
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.getMyVenues = async (req, res) => {
  try {
    const venues = await Venue.find({ owner: req.user.id });
    res.json({ venues });
  } catch (error) {
    console.error('Get venues error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
}; 