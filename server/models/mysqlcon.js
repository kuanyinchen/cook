require('dotenv').config();
const mysql = require('mysql');
const { DB_Host, DB_Username, DB_Password, DB_Database } = process.env;

const mysqlConfig = {
    host: DB_Host,
    user: DB_Username,
    password: DB_Password,
    database: DB_Database,
};

const mysqlCon = mysql.createConnection(mysqlConfig);

const query = (statement, info) => {
    return new Promise((resolve, reject) => {
        mysqlCon.query(statement, info, (err, result) => {
            if (err) reject(err);
            resolve(result);
        });
    });
};

module.exports = {
    query,
};
