const express = require('express');
const path = require('path');
const cors = require('cors');
const volleyball = require('volleyball');
const app = express();

//logging middleware
app.use(cors());
app.use(volleyball);

//TODO:delete if unneeded in bug fix
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// static middleware
app.use(express.static(path.join(__dirname, '../public')));

//this is where some things should go
app.use('/api', require('./api'));

//TODO: figure out wtf is going on
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
});

//send to the home page
// app.get('*', (req, res) => {
//     /*typing /students/ returns html status 200
//     but turns bundle.js into this:
// <!DOCTYPE html>
// <html lang="en">
//     <head>
//         <title>JPFP</title>
//         <script src="./bundle.js" defer></script>
//     </head>
//     <body>
//         <div id="root"></div>
//     </body>
// </html>

//     server side recieves:
// 6ZIi ——> GET /students/
// inside * route sending this:  /home/byerley/FSA/junior/2208-jpfp/public/index.html
// 6ZIi <—— 200 OK 195 B text/html; charset=UTF-8 (<—> 8.5 ms)
// O9gx ——> GET /students/bundle.js
// inside * route sending this:  /home/byerley/FSA/junior/2208-jpfp/public/index.html
// O9gx <—— 200 OK 195 B text/html; charset=UTF-8 (<—> 4.5 ms)

// should not be redirecting to /bundle.js file still sends the main paig but tries to run the js file so it throws an error
// */

//     res.sendFile(path.join(__dirname, '..', '/public/index.html'));
// });

//TODO: fix bug
//^^ redirects routes to api correctly unless another / is added
//localhost:3000/students works, localhost:3000/sudents/ doesnt

//handle 404 with react-router

//handle errors
app.use((err, req, res, next) => {
    console.error(err);
    res.status(err.status || 500).send(err.message || 'Internal server error');
});

module.exports = app;
