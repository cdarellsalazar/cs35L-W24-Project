const express = require('express')
const requireAuth = require('../middleware/requireAuth')
const router = express.Router();
const { createDisruptModel } = require('../controllers/disruptController')

router.use(requireAuth)

console.log('000000000000000000000000000000000000000000000000000')

router.use(createDisruptModel)

module.exports = router;