//ensures that when the API receives a certain request, it knows which controller function should handle it
const express = require('express');
const router = express.Router();
const messageController = require('../controllers/messageController');

// POST endpoint for sending a message
router.post('/send', messageController.sendMessage);

// GET endpoint for retrieving all messages for a user
router.get('/messages', messageController.getMessagesForUser);

// GET endpoint for retrieving unread messages for a user
router.get('/message/unread/:userId', messageController.getUnreadMessages);

// GET endpoint for retrieving all messages for a user given a search query
router.get('/message/:userId/:searchQuery', messageController.getMessagesWithSearchQuery);

// PUT endpoint for marking a message as read
router.put('/message/read/:messageId', messageController.markMessageAsRead);

module.exports = router;
