'use strict';
const express = require('express');
const {loginUser, logout, generateToken} = require('../controllers/auth');

const router = express.Router();

router.post('/login', loginUser, generateToken);
router.get('/logout', logout);

module.exports = router;