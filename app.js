require('dotenv').config();
const { PORT, API_VERSION } = process.env;
const port = PORT;

// Express Initialization
const express = require('express');
const bodyparser = require('body-parser');
const app = express();

//socket.io
// var http = require('http').Server(app);
// app.get('/', function (req, res) {
//     res.render('index.html');
// });

//For jQuery to work in Node
const { JSDOM } = require('jsdom');
const { window } = new JSDOM('');
const $ = require('jquery')(window);

app.use(express.static('public'));
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));

app.get('/', function (req, res) {
    res.send('Hello World!');
});

app.use('/api/' + API_VERSION, [require('./server/routes/upload_route')]);

// Page not found
app.use(function (req, res, next) {
    res.status(404).sendFile(__dirname + '/public/404.html');
});

// Error handling
app.use(function (err, req, res, next) {
    console.log(err);
    res.status(500).send('Internal Server Error');
});

app.listen(port, () => {
    console.log(`listening at ${port}`);
});

// http.listen(port, () => {
//     console.log('socket.io listening on *:3000');
// });

module.exports = app;
