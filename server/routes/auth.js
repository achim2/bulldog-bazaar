const express = require('express');
const router = express.Router();

const authController = require('../controllers/auth');
const authValidation = require('../validation/auth')

router.put('/signup', authValidation.signup, authController.signup);

router.post('/login', authController.login);

module.exports = router;
