const router = require('express').Router();
const { query } = require('../models/mysqlcon');

router.get('/recipes/all', async (req, res) => {
    const recipeCounts = await query('SELECT COUNT(*) as count FROM recipeUpload');
    const recipeCount = recipeCounts[0].count;

    const recipesQuery = 'SELECT * FROM recipeUpload ORDER BY id';
    const recipes = await query(recipesQuery);

    for (let i = 0; i < recipes.length; i++) {
        ingredients = JSON.parse(recipes[i].ingredients);
        other_photo = JSON.parse(recipes[i].other_photo);
        step_explain = JSON.parse(recipes[i].step_explain);
        recipes[0].ingredients = ingredients;
        recipes[0].other_photo = other_photo;
        recipes[0].step_explain = step_explain;
    }

    let myObj = { data: recipes };

    res.send(myObj);

    return {
        recipeCount,
        recipes,
    };
});
module.exports = router;
