//ensures that when the API receives a certain request, it knows which controller function should handle it
const express = require('express');
const router = express.Router();
const { fetchConversations, startConversation, getConversation, getRenderInfo, getMessagesFromConvo } = require('../controllers/conversationController')
const requireAuth = require('../middleware/requireAuth')

// GET endpoint for retreiving all messages in a conversation
router.use(requireAuth)

router.get('/conversation/:conversationID', getConversation);

router.post('/newConvo', startConversation)

router.get('/', fetchConversations)

router.post('/render', getRenderInfo)

router.post('/getMessages', getMessagesFromConvo)

module.exports = router;

