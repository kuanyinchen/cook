require('dotenv').config();
const { PORT, API_VERSION } = process.env;
const port = PORT;

// Express Initialization
const express = require('express');
const bodyparser = require('body-parser');
const app = express();

//socket.io

//要再想辦法搬家
const { query } = require('./server/models/mysqlcon');
const mysql = require('mysql');
const { DB_Host, DB_Username, DB_Password, DB_Database } = process.env;

const mysqlConfig = {
    host: DB_Host,
    user: DB_Username,
    password: DB_Password,
    database: DB_Database,
};

const mysqlCon = mysql.createConnection(mysqlConfig);

//
const http = require('http').Server(app);
const io = require('socket.io')(http);
//Whenever someone connects this gets executed
io.on('connection', function (socket) {
    socket.on('query_nutrition', function (data) {
        const sql = `Select * From nutritions where name = "${data.ingredient}"`;
        mysqlCon.query(sql, function (err, rows) {
            if (err) throw err;
            console.log(rows[0].calories);
            socket.emit('nutrition_from_db', {
                calories: rows[0].calories,
                protein: rows[0].protein,
                fat: rows[0].fat,
                carbohydrates: rows[0].carbohydrates,
            });
        });

        // let info = {
        //     name: data.ingredient,
        // };
        // let sql = `SELECT calories,protein,fat,carbohydrates FROM nutritions WHERE SET ?`;
        // const queryNutritions = query(sql, info, (err, result) => {
        //     console.log('here');
        //     console.log(result);
        // });
        //{ ingredient: '蛋', gram: '' } || { ingredient: '蛋', gram: '100g' }
    });
});

//For jQuery to work in Node
const { JSDOM } = require('jsdom');
const { window } = new JSDOM('');
const $ = require('jquery')(window);

const path = require('path');
//app.use(express.static('public'));
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// app.get('/', function (req, res) {
//     res.send('Hello World!');
// });

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

// app.listen(port, () => {
//     console.log(`listening at ${port}`);
// });

http.listen(port, () => {
    console.log('socket.io listening on *:3000');
});

module.exports = app;
