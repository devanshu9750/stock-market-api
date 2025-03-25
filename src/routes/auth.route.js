const express = require('express');
const authController = require('../controllers/auth.controller');

const router = express.Router();

router.post('/otp/generate', authController.generateOTP);
router.post('/otp/verify', authController.verifyOTP);
router.post('/token/refresh', authController.generateAccessToken);

module.exports = router;