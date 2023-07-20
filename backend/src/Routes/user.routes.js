const express = require("express");
const router = express.Router();

const {getUser,createUser,loginUser} = require("../Controllers/user.controller");

const verifyToken = require("../middleware/verifyToken");

router.post('/create',createUser);
router.post('/login',loginUser);
// // method for adding a middle ware
router.route('/').get(verifyToken,getUser);


module.exports = router;