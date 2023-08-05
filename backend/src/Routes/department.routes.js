const express = require("express");
const router = express.Router();

const verifyToken = require("../middleware/verifyToken");
const department = require("../Controllers/department.controller");


router.route('/').post(verifyToken,department.createDepartment);
router.route('/add-teachers').post(verifyToken,department.addTeachers);
router.route('/add-hod').post(verifyToken,department.createHod);


module.exports = router;