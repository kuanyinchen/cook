const router = require('express').Router();

const { uploadS3 } = require('../models/multer_model');
const { createRecipe } = require('../controllers/recipe_controller');

const cpUpload = uploadS3.fields([
    { name: 'cover', maxCount: 2 },
    //{ name: 'step_p', maxCount: 8 },
]);

router.route('/upload/recipe').post(cpUpload, createRecipe);

module.exports = router;
