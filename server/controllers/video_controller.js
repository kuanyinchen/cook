const _ = require('lodash');
const Video = require('../models/video_model');

const createVideo = async (req, res) => {
    const body = req.body;

    const video = {
        title: body.title,
        description: body.description,
        videolink: req.file.key,
    };

    const videoId = Video.createVideo(video);
    res.status(200).redirect('/');
};

const getAllVideos = async (req, res) => {
    const allVideo = await Video.getAllVideos();

    const result = { data: allVideo };

    res.status(200).send(result);
};

const getSingleVideo = async (req, res) => {
    const id = req.query.id;

    const singleVideo = await Video.getSingleVideo(id);

    const result = { data: singleVideo };

    res.status(200).send(result);
};
module.exports = {
    createVideo,
    getAllVideos,
    getSingleVideo,
};
