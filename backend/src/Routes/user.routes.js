const express = require("express");
const router = express.Router();

const user = require("../Controllers/user.controller");

const validate = require("../services/validation");

const verifyToken = require("../middleware/verifyToken");

// Validate Email and Contact
router.post('/validate_email', validate.checkEmailValid);
router.post('/validate_contact', validate.checkPhone);

// User Verification and OTP
router.post('/verify-otp', user.verifyOtp);
router.post('/generate-otp', user.generateOtp);

// User Account Operations
router.post('/create', user.createUser);
router.patch('/update', verifyToken, user.updateUser);
router.post('/login', user.loginUser);
router.delete('/', user.deleteUser);
router.get('/', verifyToken, user.getUser); // Get user profile

// Contact Information
router.get('/contact', verifyToken, user.getUserContact); // Get user's contact details
router.patch('/contact', verifyToken, user.editUserContact); // Edit user's contact details

module.exports = router;

