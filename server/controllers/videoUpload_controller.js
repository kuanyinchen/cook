const _ = require('lodash');
const Video = require('../models/videoUpload_model');

const createVideo = async (req, res) => {
    body = req.body;

    const video = {
        title: body.title,
        description: body.description,
        videolink: req.file.key,
    };

    const videoId = Video.createVideo(video);
    res.status(200).redirect('/');
};

module.exports = {
    createVideo,
};
