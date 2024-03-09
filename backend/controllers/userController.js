//File containing the methods that get called by different routes relating to login process

const User = require('../models/userModel')
const jwt = require('jsonwebtoken')

const createToken = (_id) => { //Creates json web token that is used for authentication purposes
  return jwt.sign({_id}, process.env.SECRET, { expiresIn: '3d' })
}

//login user
const loginUser = async (req, res) => {
  const {email, password} = req.body

  try{
    console.log('trying')
    const user = await User.login(email, password)
    
    //create a token
    const token = createToken(user._id)

    res.status(200).json({email, token}) //Sent out success status code and return the email and newly generated token
  } catch (error) {
    console.log(error)
    res.status(400).json({error: error.message}) //If an error is detected (in this case credentials do not match, send error)
  }
}

//signup user
const signupUser = async (req, res) => {
    const {email, password} = req.body

    try{
      const user = await User.signup(email, password) 
      
      //create a token
      const token = createToken(user._id)

      res.status(200).json({email, token}) //return newly authenticated user and give token so they don't have to login after signing up
    } catch (error) {
      res.status(400).json({error: error.message})
    }
}

const fetchConvos = async (req, res) => {
  try{
      const { userID } = req.user._id

      const convos = await User.loadConversationInfo(userID)

      res.status(200).json({ convos })
      
  } catch (error) {
      res.status(400).json({ error: error.message });
  }
}

module.exports = { signupUser, loginUser, fetchConvos }