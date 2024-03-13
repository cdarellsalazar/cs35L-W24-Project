//ensures that when the API receives a certain request, it knows which controller function should handle it
const express = require('express');
const router = express.Router();
const { sendMessage, getMessages, getUnreadMessages, getMessagesWithSearchQuery, markMessageAsRead, getMessage, testExampleFunction } = require('../controllers/messageController');
const requireAuth = require('../middleware/requireAuth')

router.use(requireAuth);

// POST endpoint for sending a message
router.post('/send', sendMessage);

// GET endpoint for retrieving all messages for a user

router.get('/', getMessages);


router.get('/searchMessages', getMessagesWithSearchQuery);

// GET endpoint for retrieving unread messages for a user
//router.get('/message/unread/:userId', getUnreadMessages);

// GET endpoint for retrieving all messages for a user given a search query
//router.get('/message/:userId/:searchQuery', getMessagesWithSearchQuery);

// PUT endpoint for marking a message as read
//router.put('/message/read/:messageId', markMessageAsRead);

router.get('/getMessage/:messageID', getMessage)

router.post('/reactions/:messageId', async (req, res) => {
    try {
        const { messageId } = req.params;
        const { userId, type } = req.body;
        const result = await updateReactions(messageId, userId, type);
        res.status(200).json({ message: 'Reaction updated successfully', result });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

module.exports = router;
