// This code defines the authentication routes for user registration and login in an Express.js application. It uses the `express.Router` to create a modular set of routes that can be easily integrated into the main application. The routes are linked to their respective controller functions, which handle the logic for registering and logging in users. The `register` route is used to create a new user, while the `login` route is used to authenticate existing users. The router is then exported for use in other parts of the application.

const express = require('express');
const router = express.Router();
const { registerUser, authUser } = require('../controllers/authController');

router.post('/register', registerUser);
router.post('/login', authUser);

module.exports = router;
