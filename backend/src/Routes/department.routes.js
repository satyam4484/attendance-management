const express = require("express");
const router = express.Router();

const verifyToken = require("../middleware/verifyToken");
const {createDepartment} = require("../Controllers/department.controller");


router.route('/').post(verifyToken,createDepartment);



module.exports = router;