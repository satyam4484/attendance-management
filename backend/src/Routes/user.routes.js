const express = require("express");
const router = express.Router();

const user = require("../Controllers/user.controller");

const validate = require("../services/validation");
const service = require("../services/services");

const verifyToken = require("../middleware/verifyToken");

router.post("/validate_email", validate.checkEmailValid);
router.post("/validate_contact", validate.checkPhone);
router.post("/verify-otp", service.verifyOtp);
router.post('/generate-otp',service.generateOtp);

router.post("/create", user.createUser);
router.route("/update").patch(verifyToken, user.updateUser);
router.post("/login", user.loginUser);
router.route("/").get(verifyToken, user.getUser);


router.route('/contact').get(verifyToken,user.getUserContact);
router.route('/contact').patch(verifyToken,user.editUserContact);

module.exports = router;
