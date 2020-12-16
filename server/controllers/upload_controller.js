const _ = require('lodash');
const Recipe = require('../models/upload_model');
const jwt = require('jsonwebtoken');
const { JWT_secret } = process.env;
const pageSize = 6;

//const pattern = /<td>.*?<\/td>.*?<td>(.*?)<\/td>/s;

const createRecipe = async (req, res) => {
    const body = req.body;

    // let images = [];
    // for (let i = 0; i < req.files.step_p.length; i++) {
    //     let image = req.files.step_p[i].key;
    //     let other_pho = image.split('/');
    //     images.push(other_pho[1]);
    // }
    let mainPhotos = [];
    for (let i = 0; i < req.files.cover.length; i++) {
        let mainPhoto = req.files.cover[i].key;
        let main_pho = mainPhoto.split('/');
        mainPhotos.push(main_pho[1]);
    }
    console.log(mainPhotos);

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
                //other_photo: JSON.stringify(images),
                step_explain: JSON.stringify(body.step_d),
                user_name: decoded.name,
                userID: decoded.id,
            };

            const recipeId = Recipe.createRecipe(recipe);
            res.status(200).redirect('/');
        }
    });
};

module.exports = {
    createRecipe,
};
