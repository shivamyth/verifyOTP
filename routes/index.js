const express = require('express');
const router = express.Router();
const otpController = require('../controllers/otp_controllers');

console.log("Router loaded");

router.get('/generate-otp', otpController.generate);
router.get('/verify-otp', otpController.verify);


module.exports = router;