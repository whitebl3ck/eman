const express = require('express');
const router = express.Router();
const venueController = require('../controllers/venueController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/', authMiddleware, venueController.createVenue);
router.get('/my', authMiddleware, venueController.getMyVenues);

module.exports = router; 