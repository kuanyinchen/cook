const { query } = require('./mysqlcon');

const createVideo = async (video) => {
    const statement = 'INSERT INTO video SET ?';
    query(statement, video, (err, result) => {
        console.log('videoUpload_model here');
        if (err) throw err;
        console.log(result);
    });
};

const getAllVideos = async () => {
    const videosQuery = 'SELECT * FROM video ORDER BY id';
    const videos = await query(videosQuery);

    for (let i = 0; i < videos.length; i++) {
        const autoTime = videos[i].time_record.toISOString();
        const time = autoTime.split('T')[0];
        videos[i].time_record = time;
        videos[i].videolink = 'https://d26yxr7f4pai8s.cloudfront.net/' + videos[i].videolink;
    }

    return { videos };
};

const getSingleVideo = async (id) => {
    const videoQuery = `SELECT * FROM video where id = ${id}`;
    const video = await query(videoQuery);

    const autoTime = video[0].time_record.toISOString();
    const time = autoTime.split('T')[0];
    video[0].time_record = time;

    video[0].videolink = 'http://d26yxr7f4pai8s.cloudfront.net/' + video[0].videolink;

    return { video };
};
module.exports = {
    createVideo,
    getAllVideos,
    getSingleVideo,
};
