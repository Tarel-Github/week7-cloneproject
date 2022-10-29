const express = require('express');
const router = express.Router();

const ChatController = require('./chat.controller');
const chatController = new ChatController;

//router.get('/', chatController.???);

module.exports = router;