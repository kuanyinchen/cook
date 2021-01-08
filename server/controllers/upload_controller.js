const Recipe = require('../models/upload_model');
const jwt = require('jsonwebtoken');
const { JWT_secret } = process.env;

const createRecipe = async (req, res) => {
    const body = req.body;

    let mainPhotos = [];
    if (req.files.cover == undefined) return res.status(200).json({ error: 'there is no picture' });
    for (let i = 0; i < req.files.cover.length; i++) {
        let mainPhoto = req.files.cover[i].key;
        let mainPho = mainPhoto.split('/');
        mainPhotos.push('https://d26yxr7f4pai8s.cloudfront.net/RecipePic/' + mainPho[1]);
    }

    let token = body.jwtToken;

    jwt.verify(token, JWT_secret, (err, decoded) => {
        if (err) {
            res.send('jwtToken has wrong');
        } else {
            const recipe = {
                title: body.title,
                description: body.description,
                size: body.quantity,
                cooktime: body.time,
                ingredients: JSON.stringify(body.ingredient),
                grams: JSON.stringify(body.grams),
                main_photo: JSON.stringify(mainPhotos),
                step_explain: JSON.stringify(body.step_d),
                user_name: decoded.name,
                user_id: decoded.id,
            };

            const recipeId = Recipe.createRecipe(recipe);
            res.status(200).redirect('/');
        }
    });
};

module.exports = {
    createRecipe,
};
