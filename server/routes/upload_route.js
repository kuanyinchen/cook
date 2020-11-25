const router = require('express').Router()

const { uploadS3 } = require('../models/multer_model')

// const cpUpload = uploadS3.fields([
//     { name: 'main_image', maxCount: 1 },
//     { name: 'other_images', maxCount: 8 }
// ]);

module.exports = router
