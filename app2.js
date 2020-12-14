require('dotenv').config();
const { PORT, API_VERSION } = process.env;
const port = PORT;

// Express Initialization
const express = require('express');
const bodyparser = require('body-parser');
const app = express();
const path = require('path');

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/' + API_VERSION, [require('./server/routes/formtest.js')]);

app.listen(port, () => {
    console.log(`listening at ${port}`);
});

module.exports = app;
