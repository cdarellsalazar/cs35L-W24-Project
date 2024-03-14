const express = require('express')
const requireAuth = require('../middleware/requireAuth')
const router = express.Router();
//const {  } = require('../controllers/disruptController')

router.use(requireAuth)

//router.use()

module.exports = router;