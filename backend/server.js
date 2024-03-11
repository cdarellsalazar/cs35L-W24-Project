//File that starts application, outputs console data for developers, and sets routes
require('dotenv').config()

const express = require('express');
const mongoose = require('mongoose')
const userRoutes = require('./routes/user')
const messageRoutes = require('./routes/message')
const conversationRoutes = require('./routes/conversation')
const cors = require('cors')

// creates express app
const app = express();



//middleware (debug info for us)
app.use(cors());
app.use(express.json())

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
//app.use('/api/message', messageRoutes)
//app.use('/api/converastion', conversationRoutes)

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

