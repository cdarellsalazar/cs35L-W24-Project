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
const { instrument } = require('@socket.io/admin-ui')
const Conversation = require('./models/conversationModel')

// creates express app
const app = express();

//middleware (debug info for us)
app.use(cors());
app.use(express.json())
app.use(express.static('public'));

app.use((req, res, next) => {
    console.log(req.path, req.method)
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
       const server = app.listen(4000, () => {
        console.log('listening on port ', 4000)
        const corsOptions = {
          origin: ["http://localhost:3000", "https://admin.socket.io"],
          methods:["GET", "POST"],
          credentials: true
        }
        const io = require('socket.io')(server, {
          cors: corsOptions
        });

        io.on("connection", socket => {
          console.log('Connection established: ', socket.id)

          socket.on("setup", (userData) => {
            socket.join(userData._id);
            socket.emit("connected");
          })

          socket.on("join chat", (room) => {
            socket.join(room);
            const roomObject = io.sockets.adapter.rooms.get(room);
            console.log("User Joined Room: " + room, " established by: ", socket.id);
            console.log("Users currently in Room: " + room, " ", Array.from(roomObject))
          })

          /*socket.on('new message', async (newMessageRecieved) => {
             const conversationID = newMessageReceived.conversation
            
            try{
              const conversation = await Conversation.findById(conversationID)
              conversation.participants.forEach(participant => {
                if(participant == newMessageRecieved.sender){
                  return;
                }
                socket.in(participant).emit("message received", newMessageRecieved)
              })
            } catch( error ){
              console.log("ERROR IN RECEIVING MESSAGE: ", error)
            }
          }) **/

          socket.on('new message', (newMessage, room) => {
            socket.to(room).emit('received message', (newMessage))
          })
        })
        instrument(io, { auth: false })
       }) 
    })
    .catch((error) => {
        console.log(error)
    })

