//File that manages how different routes are dealt with by the server by controlling control methods

const express = require('express')
const requireAuth = require('../middleware/requireAuth')
const imageUpload = require('../middleware/imageUpload');

//controller functions
const { getCurrentUser, signupUser, loginUser, getUserByIdFromReq, getUserByUsernameFromReq, updateUserProfileImage } = require('../controllers/userController');

//router object that holds routes to be exported
const router = express.Router()

//login route
router.post('/login', loginUser)

//signup route
router.post('/signup', signupUser)

//user id route
//router.post('/getUserByIdFromReq', getUserByIdFromReq);

// User by username route
router.post('/getUserByUsernameFromReq', getUserByUsernameFromReq);

//Get currently logged in user
router.get('/getCurrentUser', getCurrentUser)

router.post('/updateProfileImage', requireAuth, imageUpload.single('profileImage'), updateUserProfileImage);

module.exports = router;