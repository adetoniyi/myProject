
// This code defines a function `generateToken` that creates a JSON Web Token (JWT) using the `jsonwebtoken` library.

const jwt = require('jsonwebtoken');

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

module.exports = generateToken;
