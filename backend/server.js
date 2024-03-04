//File that starts application, outputs console data for developers, and sets routes
require('dotenv').config()

const express = require('express');
const mongoose = require('mongoose')
const userRoutes = require('./routes/user')
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

//routes
app.use('/api/user', userRoutes)

// connect to db
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
       app.listen(process.env.PORT, () => {
        console.log('listening on port', process.env.PORT)
       }) 
    })
    .catch((error) => {
        console.log(error)
    })

