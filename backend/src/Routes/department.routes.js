const express = require("express");
const router = express.Router();

const department = require("../Controllers/department.controller")
const verifyToken = require("../middleware/verifyToken");

router.route('/add').post(verifyToken,department.addDepartment);
router.post('/add',department.addSem);

module.exports = router;

