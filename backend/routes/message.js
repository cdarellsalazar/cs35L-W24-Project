//ensures that when the API receives a certain request, it knows which controller function should handle it
const express = require('express');
const router = express.Router();
const { sendMessage, getMessages, getUnreadMessages, getMessagesWithSearchQuery, markMessageAsRead, getMessage, testExampleFunction, updateReactions } = require('../controllers/messageController');


// POST endpoint for sending a message
router.post('/send', sendMessage);

// GET endpoint for retrieving all messages for a user

router.get('/getMessage/:messageID', getMessage);


// GET endpoint for retrieving unread messages for a user
//router.get('/message/unread/:userId', getUnreadMessages);

// GET endpoint for retrieving all messages for a user given a search query
//router.get('/message/:userId/:searchQuery', getMessagesWithSearchQuery);

// PUT endpoint for marking a message as read
//router.put('/message/read/:messageId', markMessageAsRead);

router.get('/getMessage/:messageID', getMessage)

router.post('/reactions/:messageId', async (req, res) => {
    console.log('Calling updateReactions'); // Log to confirm route is reached
    try {
        const { messageId } = req.params;
        const { userId, type } = req.body;
        const result = await updateReactions(messageId, userId, type); // Store result to inspect
        console.log('Update result:', result); // Log result to inspect
        res.status(200).json({ message: 'Reaction updated successfully', result });
    } catch (error) {
        console.error('Error in updateReactions:', error); // More detailed error logging
        res.status(400).json({ error: error.message });
    }
});



module.exports = router;
