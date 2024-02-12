require('dotenv').config()

const express = require('express');

// creates express app
const app = express();

//listens for requests on port 3000
app.listen(process.env.PORT);

//homepage TODO 
 app.get('/', (req, res) => {
    res.json({mssg: 'Welcome to the app'})
});

/*//404 page (for any pages we haven't implemented yet)
 app.use((req, res) => {
    res.status(404).sendFile('./views/404.html', { root: __dirname });
 }); */