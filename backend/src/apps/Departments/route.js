const express = require("express");
const router = express.Router();
const department = require("./service")
const verifyToken = require("../../middleware/verifyToken");

router.route('/add').post(verifyToken,department.addDepartment)

// router.post('/create',user.createUser);
// router.post('/login',user.loginUser);
// // method for adding a middle ware
// router.route('/').get(verifyToken,user.getUser);
module.exports = router;


