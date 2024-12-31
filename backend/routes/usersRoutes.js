const express = require('express');
const router = express.Router();
const userControllers = require('../controllers/usersControllers');

// User registration route
router.post('/register', userControllers.register);

// User login route
router.post('/login', userControllers.login);

module.exports = router;
