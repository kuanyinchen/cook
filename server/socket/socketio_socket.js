const { query } = require('../models/mysqlcon');

const socketCon = (io) => {
    io.on('connection', function (socket) {
        socket.on('query_nutrition', function (data) {
            let grams = parseInt(data.gram) / 100;
            const sql = `Select * From nutritions where name = "${data.ingredient}"`;
            query(sql, function (err, rows) {
                if (err) throw err;
                socket.emit('nutrition_from_db', {
                    calories: rows[0].calories * grams,
                    protein: rows[0].protein * grams,
                    fat: rows[0].fat * grams,
                    carbohydrates: rows[0].carbohydrates * grams,
                });
            });
        });
        socket.on('total_nutritions', function (data) {
            let info = {
                calories: data[0],
                proteins: data[1],
                carbohydrates: data[2],
                fat: data[3],
                title: data[4],
                category: data[5],
            };
            const sql = 'INSERT INTO recipe_album SET ?';
            query(sql, info, (err, rows) => {
                if (err) throw err;
                console.log(rows);
            });
        });
    });
};

module.exports = { socketCon };
