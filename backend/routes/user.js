const express = require('express');

const router = express.Router();

const User = require('../controller/user');

router.post("/signup",User.userSignUp);

router.post("/login",User.userLogin);

module.exports = router;
