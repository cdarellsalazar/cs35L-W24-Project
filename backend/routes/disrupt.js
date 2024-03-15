const express = require('express')
const requireAuth = require('../middleware/requireAuth')
const router = express.Router();
const { createDisruptModel, createDisruptConversation } = require('../controllers/disruptController')

router.use(requireAuth)

router.use(createDisruptModel)

router.post('/disruptResponse', disruptPopFromQueueAndReturnParticipants)

module.exports = router;