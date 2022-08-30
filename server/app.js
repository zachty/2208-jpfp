const express = require('express');
const path = require('path');
const cors = require('cors');
const volleyball = require('volleyball');
const app = express();

// static middleware
app.use(express.static(path.join(__dirname, '..', 'public')));

app.use(cors());
app.use(volleyball);

//this is where some things should go
app.use('/api', require('./api'));

//send to the home page
app.get('/', (req, res, next) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
});

//catch unknown routes and send 404
app.get('*', (req, res, next) => {
    const err = new Error(`<h2>Page not found! Try a different route!</h2>`);
    err.status = 404;
    next(err);
});

//handle errors
app.use((err, req, res, next) => {
    console.error(err);
    res.status(err.status || 500).send(err.message || 'Internal server error');
});

module.exports = app;
