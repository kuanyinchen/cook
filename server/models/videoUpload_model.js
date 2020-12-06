const { query } = require('../models/mysqlcon');

const createVideo = async (video) => {
    statement = `INSERT INTO video SET ?`;
    query(statement, video, (err, result) => {
        console.log('videoUpload_model here');
        if (err) throw err;
        console.log(result);
    });
};

module.exports = {
    createVideo,
};
