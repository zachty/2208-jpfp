const express = require('express');
const path = require('path');
const cors = require('cors');
const volleyball = require('volleyball');
const app = express();

//logging middleware
app.use(cors());
app.use(volleyball);

//body parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// static middleware
app.use(express.static(path.join(__dirname, '../public')));

//this is where some things should go
app.use('/api', require('./api'));

app.get('*', (req, res, next) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
});

//handle 404 with react-router

//handle errors
app.use((err, req, res, next) => {
    console.error(err);
    res.status(err.status || 500).send(err.message || 'Internal server error');
});

module.exports = app;
