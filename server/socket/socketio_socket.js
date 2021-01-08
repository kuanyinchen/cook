const { query } = require('../models/mysqlcon');
const { rollback, transaction, commit } = require('../models/mysqlcon');

const socketCon = (io) => {
    io.on('connection', function (socket) {
        socket.on('query_nutrition', async function (data) {
            try {
                await transaction();
                let grams = parseInt(data.gram) / 100;
                const sql = `Select * From nutritions where name = "${data.ingredient}"`;
                await query(sql, function (err, rows) {
                    if (err) throw err;
                    if (rows.length == 0) {
                        socket.emit('error_message', { error: 'there is no result' });
                    } else {
                        socket.emit('nutrition_from_db', {
                            calories: rows[0].calories * grams,
                            protein: rows[0].protein * grams,
                            fat: rows[0].fat * grams,
                            carbohydrates: rows[0].carbohydrates * grams,
                        });
                    }
                });
                await commit();
                return true;
            } catch (error) {
                await rollback();
                return { error };
            }
        });
        socket.on('total_nutritions', async function (data) {
            try {
                if (
                    data[0] == undefined ||
                    data[1] == undefined ||
                    data[2] == undefined ||
                    data[3] == undefined ||
                    data[4] == undefined ||
                    data[5] == undefined
                )
                    return;
                await transaction();
                let info = {
                    calories: data[0],
                    proteins: data[1],
                    carbohydrates: data[2],
                    fat: data[3],
                    title: data[4],
                    category: data[5],
                };
                const sql = 'INSERT INTO recipe_album SET ?';
                await query(sql, info, (err, rows) => {
                    if (err) throw err;
                    console.log(rows);
                });
                await commit();
                return true;
            } catch (error) {
                await rollback();
                return { error };
            }
        });
    });
};

module.exports = { socketCon };
