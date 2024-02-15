//ensures that when the API receives a certain request, it knows which controller function should handle it
const express = require('express');
const router = express.Router();
const messageController = require('../controllers/messageController');

// POST endpoint for sending a message
router.post('/send', messageController.sendMessage);

// GET endpoint for retrieving all messages for a user
router.get('/user/:userId', messageController.getMessagesForUser);

// GET endpoint for retrieving unread messages for a user
router.get('/user/:userId/unread', messageController.getUnreadMessages);

// PUT endpoint for marking a message as read
router.put('/read/:messageId', messageController.markMessageAsRead);

module.exports = router;
