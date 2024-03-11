//File that manages how different routes are dealt with by the server by controlling control methods

const express = require('express')

//controller functions
const { signupUser, loginUser, getUserByIdFromReq, getUserByUsernameFromReq } = require('../controllers/userController');

//router object that holds routes to be exported
const router = express.Router()

//login route
router.post('/login', loginUser)

//signup route
router.post('/signup', signupUser)

//user id route
router.post('/getUserByIdFromReq', getUserByIdFromReq);

// User by username route
router.post('/getUserByUsernameFromReq', getUserByUsernameFromReq);

module.exports = router;