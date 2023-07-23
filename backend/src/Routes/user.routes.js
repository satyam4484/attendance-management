const express = require("express");
const router = express.Router();

const {
  getUser,
  createUser,
  loginUser,
  checkEmailValid,
  checkPhone,
  updateUser,
  verifyOtp,
  generateOtp
} = require("../Controllers/user.controller");

const verifyToken = require("../middleware/verifyToken");

router.post("/validate_email", checkEmailValid);
router.post("/validate_contact", checkPhone);
router.post("/verify-otp", verifyOtp);
router.post('/generate-otp',generateOtp);

router.post("/create", createUser);
router.route("/update/:id").patch(verifyToken, updateUser);
router.post("/login", loginUser);
// // method for adding a middle ware
router.route("/").get(verifyToken, getUser);

module.exports = router;
