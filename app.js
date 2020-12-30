require('dotenv').config();
const { PORT, API_VERSION } = process.env;
const port = PORT;

// Express Initialization
const express = require('express');
const bodyparser = require('body-parser');
const app = express();

//socket.io
const http = require('http').Server(app);
const io = require('socket.io')(http);
const { socketCon } = require('./server/socket/socketio_socket');
socketCon(io);

//autocomplement fetch data.json
const fetch = require('node-fetch');

//For jQuery to work in Node
const { JSDOM } = require('jsdom');
const { window } = new JSDOM('');
const $ = require('jquery')(window);

const path = require('path');

const axios = require('axios');

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// app.get('/', function (req, res) {
//     res.send('Hello World!');
// });
app.get('/', (req, res) => {
    res.send('HOME');
});

app.use('/api/' + API_VERSION, [
    require('./server/routes/upload_route'),
    require('./server/routes/recipes_route'),
    require('./server/routes/video_route'),
    require('./server/routes/user_route.js'),
]);

// Page not found
app.use(function (req, res, next) {
    res.status(404).sendFile(__dirname + '/public/404.html');
});

// Error handling
app.use(function (err, req, res, next) {
    console.log(err);
    res.status(500).send('Internal Server Error');
});

http.listen(port, () => {
    console.log(`socket.io listening on *:${port}`);
});

module.exports = app;
