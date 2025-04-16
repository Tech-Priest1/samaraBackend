const express = require('express');
const messageController = require('../controllers/messageController');
const router = express.Router();

// Route to send a message
router.post('/', messageController.createMessage);

// Route to get messages between two users
router.get('/', messageController.getMessages);

module.exports = router;
