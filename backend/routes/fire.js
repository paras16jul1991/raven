const express = require('express');

const router = express.Router();

const Fire = require('../controller/fire');

router.get("/menus",Fire.Menus);

module.exports = router;
