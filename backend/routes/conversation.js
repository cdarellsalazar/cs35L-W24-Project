//ensures that when the API receives a certain request, it knows which controller function should handle it
const express = require('express');
const router = express.Router();
const conversationController = require('../controllers/conversationController');

// GET endpoint for retreiving all messages in a conversation
router.get('/conversation/:conversationID', conversationController.getConversation);

module.exports = router;