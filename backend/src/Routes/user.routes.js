const express = require("express");
const router = express.Router();

const user = require("../Controllers/user.controller");

const validate = require("../services/validation");

const verifyToken = require("../middleware/verifyToken");

router.post("/validate_email", validate.checkEmailValid);
router.post("/validate_contact", validate.checkPhone);
router.post("/verify-otp", user.verifyOtp);
router.post('/generate-otp',user.generateOtp);

router.post("/create", user.createUser);
router.route("/update").patch(verifyToken, user.updateUser);
router.post("/login", user.loginUser);
router.delete("/",user.deleteUser);
router.route("/").get(verifyToken, user.getUser);



router.route('/contact').get(verifyToken,user.getUserContact);
router.route('/contact').patch(verifyToken,user.editUserContact);

module.exports = router;


// adding some comments 