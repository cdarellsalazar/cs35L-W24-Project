//File that starts application, outputs console data for developers, and sets routes
require('dotenv').config()

const express = require('express');
const mongoose = require('mongoose')
const userRoutes = require('./routes/user')

// creates express app
const app = express();


//middleware (debug info for us)
app.use(express.static('../frontend/src/pages/register.js'))
app.use(express.json())

app.post('/', (req, res) => {
    const  { parcel } = req.body
    console.log(parcel)
    if (!parcel) {
        res.status(400).send({ status: 'failed'})
    }
    res.status(200).send({ status: 'received' })
})

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

