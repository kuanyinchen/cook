require('dotenv').config();
const mysql = require('mysql');
const { promisify } = require('util'); // util from native nodejs library
const { DB_Host, DB_Username, DB_Password, DB_Database } = process.env;

const mysqlConfig = {
    host: DB_Host,
    user: DB_Username,
    password: DB_Password,
    database: DB_Database,
};

const mysqlCon = mysql.createConnection(mysqlConfig);
mysqlCon.connect(console.log('has connected'));

const query = (statement, info) => {
    return new Promise((resolve, reject) => {
        mysqlCon.query(statement, info, (err, result) => {
            if (err) reject(err);
            resolve(result);
        });
    });
};

const promiseTransaction = promisify(mysqlCon.beginTransaction).bind(mysqlCon);
const promiseCommit = promisify(mysqlCon.commit).bind(mysqlCon);
const promiseRollback = promisify(mysqlCon.rollback).bind(mysqlCon);

module.exports = {
    query,
    rollback: promiseRollback,
    transaction: promiseTransaction,
    commit: promiseCommit,
};
