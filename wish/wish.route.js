const express = require('express');
const router = express.Router();

const WishController = require('./wish.controller');
const wishController = new WishController;

//router.get('/', wish.???);

module.exports = router;