// This file defines the Property model for the real estate application.
// It uses Mongoose to create a schema for the properties, which includes fields like title, description, price, location, type (sale or rent), and references to the user who posted the property. The model is then exported for use in other parts of the application.

const mongoose = require('mongoose');

const propertySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  price: {
    type: Number,
    required: true,
  },
  location: String,
  type: {
    type: String,
    enum: ['sale', 'rent'],
    default: 'sale',
  },
  postedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  postedByRole: {
    type: String,
    enum: ['agent', 'owner'],
  },
  interestedBuyers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
});

module.exports = mongoose.model('Property', propertySchema);
