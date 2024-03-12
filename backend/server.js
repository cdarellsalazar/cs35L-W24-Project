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

// creates express app
const app = express();

//middleware (debug info for us)
app.use(cors());
app.use(express.json())
app.use(express.static('public'));

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/') // Specify the directory where files will be stored
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname)) // Rename the file to avoid conflicts
    }
  });

  const fileFilter = (req, file, cb) => {
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
      return cb(new Error('Only image files are allowed!'), false);
    }
    cb(null, true);
  };

  const upload = multer({ storage: storage, fileFilter: fileFilter });


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

app.post('/upload', upload.single('image'), (req, res) => {
    console.log('File:', req.file); // Log the file object received from Multer
    if (!req.file) {
        return res.status(400).send('No file uploaded.');
    }

    // Handle file saving here

    res.send('File uploaded successfully!');
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

