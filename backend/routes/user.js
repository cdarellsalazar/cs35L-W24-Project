//File that manages how different routes are dealt with by the server by controlling control methods

const express = require('express')
const requireAuth = require('../middleware/requireAuth')
const imageUpload = require('../middleware/imageUpload');

//controller functions
const { getCurrentUser, signupUser, loginUser, getUserID, getUserByUsernameFromReq, updateUserProfileImage, getUserImageByUsername, addToBlockedList, removeFromBlockedList} = require('../controllers/userController');

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

router.get('/userImage/:username', async (req, res) => {
    const { username } = req.params;
    try {
        const imageUrl = await getUserImageByUsername(username);
        res.send(imageUrl); 
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
});
router.use(requireAuth)

router.post('/blocked', addToBlockedList)

router.post('/unblock', removeFromBlockedList)

router.post('/getUserID', getUserID)


module.exports = router;