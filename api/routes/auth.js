const express = require('express');
const router = express.Router();

const authController = require('../controllers/auth');
const authValidation = require('../validation/auth')

router.post('/signup', authValidation.signup, authController.signup);

router.post('/login', authController.login);

router.get('/user', authController.user);

module.exports = router;
