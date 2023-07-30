const express = require("express");
const router = express.Router();

const organization= require("../Controllers/organization.controller");
const verifyToken = require("../middleware/verifyToken");

router.route('/').post(verifyToken,organization.createOrganization);
router.route('/').patch(verifyToken,organization.updateOrganization);

module.exports = router;
