//File that manages how different routes are dealt with by the server by controlling control methods

const express = require('express')
const requireAuth = require('../middleware/requireAuth')

//controller functions
const { signupUser, loginUser, fetchConvos } = require('../controllers/userController')

//router object that holds routes to be exported
const router = express.Router()

//login route
router.post('/login', loginUser)

//signup route
router.post('/signup', signupUser)

router.use(requireAuth)

module.exports = router;