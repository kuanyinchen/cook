const _ = require('lodash');
const Recipe = require('../models/recipe_model');
const pageSize = 6;

//const pattern = /<td>.*?<\/td>.*?<td>(.*?)<\/td>/s;

const createRecipe = async (req, res) => {
    const body = req.body;

    const recipe = {
        title: body.title,
        description: body.description,
        quantity: body.quantity,
        time: body.time,
        ingredients: body.ingredient,
        grams: body.grams,
        // calories: body.calories,
        // carbohydrates: body.carbohydrates,
        // fat: body.fat,
        step_description: body.step_d,
    };

    let images = [];
    for (let i = 0; i < req.files.step_p.length; i++) {
        let image = req.files.step_p[i].key;
        images.push(`${image}`);
    }
    recipe.cover = req.files.cover[0].key;
    recipe.step_pic = images;
    console.log(recipe);
    //res.status(200).send({ recipeId });
};

module.exports = {
    createRecipe,
};
