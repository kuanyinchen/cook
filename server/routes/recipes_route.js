const router = require('express').Router();
const { query } = require('../models/mysqlcon');

router.get('/recipes/all', (req, res) => {
    let offset = parseInt(req.query.paging) * 6 || 0;
    let sql = `SELECT SQL_CALC_FOUND_ROWS * FROM recipeUpload LIMIT ${offset},6`;
    query(sql, (err, result) => {
        if (err) throw err;
        console.log(result);
    });
});
module.exports = router;
