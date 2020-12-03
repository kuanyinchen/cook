const { query } = require('../models/mysqlcon');

const socketCon = (io) => {
    io.on('connection', function (socket) {
        socket.on('query_nutrition', function (data) {
            const sql = `Select * From nutritions where name = "${data.ingredient}"`;
            query(sql, function (err, rows) {
                if (err) throw err;
                socket.emit('nutrition_from_db', {
                    calories: rows[0].calories,
                    protein: rows[0].protein,
                    fat: rows[0].fat,
                    carbohydrates: rows[0].carbohydrates,
                });
            });
        });
        socket.on('total_nutritions', function (data) {
            let info = {
                calories: data[0],
                proteins: data[1],
                fat: data[2],
                carbohydrates: data[3],
                title: data[4],
                category: data[5],
            };
            const sql = `INSERT INTO recipeAlbum SET ?`;
            query(sql, info, (err, rows) => {
                if (err) throw err;
                console.log(rows);
            });
        });
    });
};

module.exports = { socketCon };
