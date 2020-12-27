const router = require('express').Router();
const fs = require('fs');
const { uploadVideotoS3 } = require('../models/multer_model');
const { createVideo } = require('../controllers/videoUpload_controller');
const { query } = require('../models/mysqlcon');

const videoUpload = uploadVideotoS3.single('video');

router.route('/upload/video').post(videoUpload, createVideo);

router.get('/video/all', async (req, res) => {
    body = req.body;

    const VideosQuery = 'SELECT * FROM video ORDER BY id';
    const Video = await query(VideosQuery);

    for (let i = 0; i < Video.length; i++) {
        let autoTime = Video[i].time_record.toISOString();
        let time = autoTime.split('T')[0];
        Video[i].time_record = time;
        Video[i].videolink = 'http://d26yxr7f4pai8s.cloudfront.net/' + Video[i].videolink;
    }

    let myObj = { data: Video };

    res.send(Video);

    return {
        Video,
    };
});

router.get('/video/single', async (req, res) => {
    const id = req.query.id;

    body = req.body;

    const VideosQuery = `SELECT * FROM video where id = ${id}`;
    const Video = await query(VideosQuery);

    let autoTime = Video[0].time_record.toISOString();
    let time = autoTime.split('T')[0];
    Video[0].time_record = time;

    Video[0].videolink = 'http://d26yxr7f4pai8s.cloudfront.net/' + Video[0].videolink;

    let myVideo = { data: Video };

    res.send(Video);

    return {
        myVideo,
    };
});

//get video的畫面
// router.get('/video', (req, res) => {
//     const range = req.headers.range;
//     if (!range) {
//         res.status(400).send('Requires Range header');
//     }

//     const videoPath = 'Cheesecake_Flan_Recipe.mp4';
//     const videoSize = fs.statSync('Cheesecake_Flan_Recipe.mp4').size;

//     // Parse Range
//     // Example: "bytes=32324-"
//     const CHUNK_SIZE = 10 ** 6; // 1MB
//     const start = Number(range.replace(/\D/g, ''));
//     const end = Math.min(start + CHUNK_SIZE, videoSize - 1);

//     // Create headers
//     const contentLength = end - start + 1;
//     const headers = {
//         'Content-Range': `bytes ${start}-${end}/${videoSize}`,
//         'Accept-Ranges': 'bytes',
//         'Content-Length': contentLength,
//         'Content-Type': 'video/mp4',
//     };

//     // HTTP Status 206 for Partial Content
//     res.writeHead(206, headers);

//     // create video read stream for this particular chunk
//     const videoStream = fs.createReadStream(videoPath, { start, end });

//     // Stream the video chunk to the client
//     videoStream.pipe(res);
// });

module.exports = router;
