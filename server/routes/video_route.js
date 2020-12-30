const router = require('express').Router();
const { uploadVideotoS3 } = require('../models/multer_model');
const { createVideo } = require('../controllers/video_controller');
const { getAllVideos, getSingleVideo } = require('../controllers/video_controller');

const videoUpload = uploadVideotoS3.single('video');

router.route('/upload/video').post(videoUpload, createVideo);

router.route('/video/all').get(getAllVideos);
router.route('/video/single').get(getSingleVideo);

module.exports = router;
