const express = require("express");
const router = express.Router();
const user = require("./service")


router.get('/',user.get);


module.exports = router;


