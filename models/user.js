// This code defines a Mongoose schema for a User model in a Node.js application. It includes fields for name, email, password, role, and favorites. The password is hashed before saving to the database, and a method is provided to compare the entered password with the hashed password.
// This is a Mongoose model for a User in a real estate application. It includes fields for name, email, password, role, and favorites. The password is hashed before saving to the database, and a method is provided to compare the entered password with the hashed password.

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['buyer', 'agent', 'owner'],
    default: 'buyer',
  },
  favorites: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Property',
    },
  ],
});

// Encrypt password before saving
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Match user entered password to hashed password in database
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', userSchema);
