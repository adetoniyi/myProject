// This code defines the controller functions for handling property-related operations in an Express.js application. Each function corresponds to a specific route and performs the necessary database operations using Mongoose. The functions handle creating properties, retrieving all properties, getting properties posted by the logged-in user, favoriting a property, and expressing interest in a property. Each function also includes error handling to ensure that appropriate responses are sent back to the client in case of any issues.
// The functions are then exported for use in the routes, allowing for a clean separation of concerns between the controller logic and the routing logic. This modular approach makes it easier to maintain and scale the application as needed.

const Property = require('../models/Property');

// @desc    Create a new property
// @route   POST /api/properties
// @access  Private (Agent/Owner)
const createProperty = async (req, res) => {
  const { title, description, price, location, type } = req.body;

  try {
    const property = await Property.create({
      title,
      description,
      price,
      location,
      type,
      postedBy: req.user._id,
      postedByRole: req.user.role,
    });

    res.status(201).json(property);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get all properties
// @route   GET /api/properties
// @access  Public
const getProperties = async (req, res) => {
  try {
    const properties = await Property.find().populate('postedBy', 'name email');
    res.json(properties);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get properties posted by logged-in user
// @route   GET /api/properties/my
// @access  Private (Agent/Owner)
const getMyProperties = async (req, res) => {
  try {
    const properties = await Property.find({ postedBy: req.user._id });
    res.json(properties);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Favorite a property
// @route   POST /api/properties/:id/favorite
// @access  Private (Buyer)
const favoriteProperty = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);

    if (!property) {
      return res.status(404).json({ message: 'Property not found' });
    }

    if (req.user.favorites.includes(property._id)) {
      return res.status(400).json({ message: 'Property already favorited' });
    }

    req.user.favorites.push(property._id);
    await req.user.save();

    res.json({ message: 'Property favorited' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Express interest in a property
// @route   POST /api/properties/:id/contact
// @access  Private (Buyer)
const contactProperty = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);

    if (!property) {
      return res.status(404).json({ message: 'Property not found' });
    }

    if (property.interestedBuyers.includes(req.user._id)) {
      return res.status(400).json({ message: 'Already expressed interest' });
    }

    property.interestedBuyers.push(req.user._id);
    await property.save();

    res.json({ message: 'Interest expressed' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  createProperty,
  getProperties,
  getMyProperties,
  favoriteProperty,
  contactProperty,
};

