const _ = require('lodash');
const Recipe = require('../models/recipe_model');
const pageSize = 6;

//const pattern = /<td>.*?<\/td>.*?<td>(.*?)<\/td>/s;

const createRecipe = async (req, res) => {
    const body = req.body;

    let images = [];
    for (let i = 0; i < req.files.step_p.length; i++) {
        let image = req.files.step_p[i].key;
        let other_pho = image.split('/');
        images.push(other_pho[1]);
    }
    let mainPhoto = req.files.cover[0].key;
    let main_pho = mainPhoto.split('/');

    const recipe = {
        title: body.title,
        description: body.description,
        size: body.quantity,
        cooktime: body.time,
        ingredients: JSON.stringify(body.ingredient),
        grams: JSON.stringify(body.grams),
        main_photo: main_pho[1],
        other_photo: JSON.stringify(images),
        step_explain: body.step_d,
    };

    const recipeId = Recipe.createRecipe(recipe);
    res.status(200).redirect('/');
};

module.exports = {
    createRecipe,
};
