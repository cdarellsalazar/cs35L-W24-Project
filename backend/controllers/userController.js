//File containing the methods that get called by different routes relating to login process

const User = require('../models/userModel')
const jwt = require('jsonwebtoken')

const createToken = (_id) => { //Creates json web token that is used for authentication purposes
  return jwt.sign({_id}, 'nZ5XM37vWkFUWTCsoCtL', { expiresIn: '3d' })
}

//login user
const loginUser = async (req, res) => {
  const data = req.body
  const email = data.email
  const password = data.password

  try{
    console.log('trying')
    console.log('verifying it works')
    const user = await User.login(email, password)
    
    //create a token
    const token = createToken(user.id)

    res.status(200).json({email, token}) //Sent out success status code and return the email and newly generated token
  } catch (error) {
    console.log(error)
    res.status(400).json({error: error.message}) //If an error is detected (in this case credentials do not match, send error)
  }
}

//signup user
const signupUser = async (req, res) => {
    const data = req.body
    const username = data.username
    const email = data.email
    const password = data.password

    try{
      const user = await User.signup(username, email, password) 
      
      //create a token
      const token = createToken(user.id)

      res.status(200).json({email, token}) //return newly authenticated user and give token so they don't have to login after signing up
      console.log(token)
    } catch (error) {
      console.log(error.message)
      res.status(400).json({error: error.message})
    }
}

const getUserByIdFromReq = async (req, res) => {
  try {
      const user = await User.findById(req.user.id);
      if (!user) {
          return res.status(404).json({ error: "User not found" });
      }
      const token = createToken(user.id);

      res.status(200).json({ user, token });
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
};

const getUserByUsernameFromReq = async (req, res) => {
  try {
    const { username } = req.body; 
    const user = await User.findOne({ username }); 

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const token = createToken(user.id);

    res.status(200).json({ user, token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { signupUser, loginUser, getUserByIdFromReq, getUserByUsernameFromReq };