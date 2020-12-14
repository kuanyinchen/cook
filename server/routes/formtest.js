const router = require('express').Router();
const { query } = require('../models/mysqlcon');
const { uploadS3 } = require('../models/multer_model');
const cpUpload = uploadS3.fields([{ name: 'cover', maxCount: 1 }]);

router.post('/formtest', cpUpload, async (req, res) => {
    const body = req.body;
    console.log(body);
    const image = req.files.cover[0].key;

    info = {
        name: body.name,
        password: body.password,
        image: image,
    };

    statement = 'INSERT INTO test SET ?';
    query(statement, info, (err, result) => {
        if (err) throw err;
        console.log(result);
    });

    res.send('OK');
});

module.exports = router;
