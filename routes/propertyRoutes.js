// This code defines the routes for property-related operations in an Express.js application. It uses the `express.Router` to create a modular set of routes that can be easily integrated into the main application. The routes are linked to their respective controller functions, which handle the logic for creating, retrieving, and deleting properties. The `auth` middleware is applied to certain routes to ensure that only authenticated users can access them. 
// The router is then exported for use in other parts of the application.

const express = require('express');
const router = express.Router();
const {
  createProperty,
  getProperties,
  getMyProperties,
  favoriteProperty,
  contactProperty,
} = require('../controllers/propertyController');
const { protect } = require('../middleware/authMiddleware');
const { authorizeRoles } = require('../middleware/roleMiddleware');

router.route('/').get(getProperties).post(protect, authorizeRoles('agent', 'owner'), createProperty);
router.route('/my').get(protect, authorizeRoles('agent', 'owner'), getMyProperties);
router.route('/:id/favorite').post(protect, authorizeRoles('buyer'), favoriteProperty);
router.route('/:id/contact').post(protect, authorizeRoles('buyer'), contactProperty);

module.exports = router;

