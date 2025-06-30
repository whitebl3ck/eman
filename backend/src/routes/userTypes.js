const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const userTypesController = require('../controllers/userTypesController');

// Get user types
router.get('/', auth, userTypesController.getUserTypes);

// Add user type
router.post('/', auth, userTypesController.addUserType);

// Set primary user type
router.put('/primary', auth, userTypesController.setPrimaryUserType);

// Remove user type
router.delete('/:type', auth, userTypesController.removeUserType);

// Update username for a role
router.put('/username', auth, userTypesController.updateRoleUsername);

module.exports = router; 