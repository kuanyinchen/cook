const router = require('express').Router();
const { query } = require('../models/mysqlcon');

router.post('/formtest', (req, res) => {
    const body = req.body;
    console.log(body);

    info = {
        name: body.name,
        password: body.password,
    };

    statement = 'INSERT INTO test SET ?';
    query(statement, info, (err, result) => {
        if (err) throw err;
        console.log(result);
    });

    res.send('OK');
});

module.exports = router;
