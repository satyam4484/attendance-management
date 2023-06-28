const express = require("express");
const router = express.Router();
const user = require("./service")
const verifyToken = require("../../middleware/verifyToken");


router.post('/create',user.createUser);
router.post('/login',user.loginUser);
// method for adding a middle ware
router.route('/').get(verifyToken,user.getUser);
module.exports = router;


