const express = require("express");
const router = express.Router();

const { createOrganization,updateOrganization } = require("../Controllers/organization.controller");
const verifyToken = require("../middleware/verifyToken");

router.route('/').post(verifyToken,createOrganization);
router.route('/').patch(verifyToken,updateOrganization);

module.exports = router;
