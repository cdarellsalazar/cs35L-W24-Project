//ensures that when the API receives a certain request, it knows which controller function should handle it
const express = require('express');
const router = express.Router();
const { sendMessage, getMessages, getUnreadMessages, getMessagesWithSearchQuery, markMessageAsRead, getMessage } = require('../controllers/messageController');

// POST endpoint for sending a message
router.post('/send', sendMessage);

// GET endpoint for retrieving all messages for a user
router.get('/', getMessages);

// GET endpoint for retrieving unread messages for a user
//router.get('/message/unread/:userId', getUnreadMessages);

// GET endpoint for retrieving all messages for a user given a search query
//router.get('/message/:userId/:searchQuery', getMessagesWithSearchQuery);

// PUT endpoint for marking a message as read
//router.put('/message/read/:messageId', markMessageAsRead);

router.get('/getMessage:messageID', getMessage)

module.exports = router;
