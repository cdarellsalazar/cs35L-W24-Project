//File that starts application, outputs console data for developers, and sets routes
require('dotenv').config()
const express = require('express');
const mongoose = require('mongoose')
const userRoutes = require('./routes/user')
const messageRoutes = require('./routes/message')
const conversationRoutes = require('./routes/conversation')
const imageUpload = require('./middleware/imageUpload');
const cors = require('cors')
const multer = require('multer');
const path = require('path');
const User = require('./models/userModel')
const requireAuth = require('./middleware/requireAuth');
// creates express app
const app = express();

//middleware (debug info for us)
app.use(cors());
app.use(express.json())
app.use(express.static('public'));

app.use((req, res, next) => {
    //console.log(req.path, req.method)
    next()
})

app.get('/', (req, res) => {
    res.send('Hello World');
})

app.post('/test', (req, res) => {
    res.send('example');
})
  
//routes
app.use('/api/user', userRoutes)
app.use('/api/message', messageRoutes)
app.use('/api/convos', conversationRoutes)


app.post('/upload', requireAuth, imageUpload.single('image'), async (req, res) => {
  if (req.file) {
    try {
      const updatedUser = await User.findByIdAndUpdate(
        req.user._id, 
        { image: req.file.path }, 
        { new: true }
      );
      if (!updatedUser) {
        return res.status(404).json({ message: 'User not found.' });
      }
      res.json({
        message: 'File uploaded successfully!',
        imageUrl: req.file.path,
        user: updatedUser, 
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error updating user image.' });
    }
  } else {
    res.status(400).json({ message: 'No file uploaded or invalid file type.' });
  }
});


// connect to db
mongoose.connect('mongodb+srv://whyvimwhenemacs:ly00MAJz6QZxZ4Og@cs35l-w24-projectdataba.l4wjg5l.mongodb.net/?retryWrites=true&w=majority')
    .then(() => {
       app.listen(4000, () => {
        console.log('listening on port ', 4000)
       }) 
    })
    .catch((error) => {
        console.log(error)
    })

