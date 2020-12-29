const router = require('express').Router();

const { uploadS3 } = require('../models/multer_model');
const { createRecipe } = require('../controllers/upload_controller');

const cpUpload = uploadS3.fields([{ name: 'cover', maxCount: 2 }]);

router.route('/upload/recipe').post(cpUpload, createRecipe);

module.exports = router;
