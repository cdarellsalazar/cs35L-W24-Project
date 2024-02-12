const express = require('express');

// creates express app
const app = express();

//listens for requests on port 3000
app.listen(3000);

//homepage 
app.get('/', (req, res) => {
    res.sendFile('./views/index.html', { root: __dirname });
});

//404 page (for any pages we haven't implemented yet)
 app.use((req, res) => {
    res.status(404).sendFile('./views/404.html', { root: __dirname });
 });