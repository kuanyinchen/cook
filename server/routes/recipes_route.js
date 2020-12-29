const router = require('express').Router();
const { IdentityStore } = require('aws-sdk');
const { query } = require('../models/mysqlcon');

router.get('/recipes/all', async (req, res) => {
    const recipeCounts = await query('SELECT COUNT(*) as count FROM recipe_upload');
    const recipeCount = recipeCounts[0].count;

    const recipesQuery =
        'SELECT * FROM recipe_upload INNER JOIN recipe_album ON recipe_upload.id = recipe_album.id ORDER BY recipe_upload.id';
    const recipes = await query(recipesQuery);

    for (let i = 0; i < recipes.length; i++) {
        let autoTime = recipes[i].time_record.toISOString();
        let time = autoTime.split('T')[0];

        ingredients = JSON.parse(recipes[i].ingredients);
        main_photo = JSON.parse(recipes[i].main_photo);
        other_photo = JSON.parse(recipes[i].other_photo);
        step_explain = JSON.parse(recipes[i].step_explain);
        grams = JSON.parse(recipes[i].grams);
        recipes[i].ingredients = ingredients;
        recipes[i].main_photo = main_photo;
        recipes[i].other_photo = other_photo;
        recipes[i].step_explain = step_explain;
        recipes[i].grams = grams;
        recipes[i].time_record = time;
    }

    let myObj = { data: recipes };

    res.send(myObj);

    return {
        recipeCount,
        recipes,
    };
});

router.get('/recipes/fitness', async (req, res) => {
    const recipeCounts = await query('SELECT COUNT(*) as count FROM recipe_album where category = "健身"');
    const recipeCount = recipeCounts[0].count;

    const recipesQuery =
        'SELECT * FROM recipe_upload INNER JOIN recipe_album ON recipe_upload.id = recipe_album.id where recipe_album.category = "健身" ORDER BY recipe_upload.id';
    const recipes = await query(recipesQuery);

    for (let i = 0; i < recipes.length; i++) {
        let autoTime = recipes[i].time_record.toISOString();
        let time = autoTime.split('T')[0];
        recipes[i].time_record = time;

        ingredients = JSON.parse(recipes[i].ingredients);
        main_photo = JSON.parse(recipes[i].main_photo);
        other_photo = JSON.parse(recipes[i].other_photo);
        step_explain = JSON.parse(recipes[i].step_explain);
        grams = JSON.parse(recipes[i].grams);
        recipes[i].ingredients = ingredients;
        recipes[i].main_photo = main_photo;
        recipes[i].other_photo = other_photo;
        recipes[i].step_explain = step_explain;
        recipes[i].grams = grams;
    }

    let myObj = { data: recipes };

    res.send(myObj);

    return {
        recipeCount,
        recipes,
    };
});

router.get('/recipes/baking', async (req, res) => {
    const recipeCounts = await query('SELECT COUNT(*) as count FROM recipe_album where category = "點心烘焙"');
    const recipeCount = recipeCounts[0].count;

    const recipesQuery =
        'SELECT * FROM recipe_upload INNER JOIN recipe_album ON recipe_upload.id = recipe_album.id where recipe_album.category = "點心烘焙" ORDER BY recipe_upload.id';
    const recipes = await query(recipesQuery);

    for (let i = 0; i < recipes.length; i++) {
        let autoTime = recipes[i].time_record.toISOString();
        let time = autoTime.split('T')[0];
        recipes[i].time_record = time;

        ingredients = JSON.parse(recipes[i].ingredients);
        main_photo = JSON.parse(recipes[i].main_photo);
        other_photo = JSON.parse(recipes[i].other_photo);
        step_explain = JSON.parse(recipes[i].step_explain);
        grams = JSON.parse(recipes[i].grams);
        recipes[i].ingredients = ingredients;
        recipes[i].main_photo = main_photo;
        recipes[i].other_photo = other_photo;
        recipes[i].step_explain = step_explain;
        recipes[i].grams = grams;
    }

    let myObj = { data: recipes };

    res.send(myObj);

    return {
        recipeCount,
        recipes,
    };
});

router.get('/recipes/more', async (req, res) => {
    let id = req.query.id;

    const recipesQuery = `SELECT * FROM recipe_upload INNER JOIN recipe_album ON recipe_upload.id = recipe_album.id where recipe_upload.id = ${id} ORDER BY recipe_upload.id`;
    const recipe = await query(recipesQuery);

    let autoTime = recipe[0].time_record.toISOString();
    let time = autoTime.split('T')[0];
    recipe[0].time_record = time;

    ingredients = JSON.parse(recipe[0].ingredients);
    main_photo = JSON.parse(recipe[0].main_photo);
    other_photo = JSON.parse(recipe[0].other_photo);
    step_explain = JSON.parse(recipe[0].step_explain);
    grams = JSON.parse(recipe[0].grams);
    recipe[0].ingredients = ingredients;
    recipe[0].main_photo = main_photo;
    recipe[0].other_photo = other_photo;
    recipe[0].step_explain = step_explain;
    recipe[0].grams = grams;

    let myObj = { data: recipe };

    res.send(myObj);

    return {
        recipe,
    };
});

router.get('/recipes/search', async (req, res) => {
    let key = req.query.key;

    const recipesQuery = `SELECT * FROM recipe_upload INNER JOIN recipe_album ON recipe_upload.id = recipe_album.id where recipe_upload.title like '%${key}%' ORDER BY recipe_upload.id`;
    const recipes = await query(recipesQuery);

    for (let i = 0; i < recipes.length; i++) {
        let autoTime = recipes[i].time_record.toISOString();
        let time = autoTime.split('T')[0];
        recipes[i].time_record = time;

        ingredients = JSON.parse(recipes[i].ingredients);
        main_photo = JSON.parse(recipes[i].main_photo);
        other_photo = JSON.parse(recipes[i].other_photo);
        step_explain = JSON.parse(recipes[i].step_explain);
        grams = JSON.parse(recipes[i].grams);
        recipes[i].ingredients = ingredients;
        recipes[i].main_photo = main_photo;
        recipes[i].other_photo = other_photo;
        recipes[i].step_explain = step_explain;
        recipes[i].grams = grams;
    }

    let myObj = { data: recipes };

    res.send(myObj);

    return {
        recipes,
    };
});

router.post('/meals/calculate', async (req, res) => {
    let body = req.body;

    let BMR = Math.round(body.bmr / 3);
    let TDEE = Math.round(body.tdee / 3);
    let carbos = Math.round(body.carbos / 3);
    let proteins = Math.round(body.proteins / 3);
    let fats = Math.round(body.fats / 3);

    const recipesSelect = `SELECT * FROM recipe_album INNER JOIN recipe_upload ON recipe_upload.id = recipe_album.id where recipe_album.carbohydrates between ${carbos}-10 AND ${carbos}+10 || recipe_album.proteins between ${proteins}-10 AND ${proteins}+10 || recipe_album.fat between ${fats}-10 AND ${fats}+10;`;

    const recipes = await query(recipesSelect);

    for (let i = 0; i < recipes.length; i++) {
        let autoTime = recipes[i].time_record.toISOString();
        let time = autoTime.split('T')[0];
        recipes[i].time_record = time;

        ingredients = JSON.parse(recipes[i].ingredients);
        main_photo = JSON.parse(recipes[i].main_photo);
        step_explain = JSON.parse(recipes[i].step_explain);
        grams = JSON.parse(recipes[i].grams);
        recipes[i].ingredients = ingredients;
        recipes[i].main_photo = main_photo;
        recipes[i].step_explain = step_explain;
        recipes[i].grams = grams;
    }

    let result = { data: recipes };

    res.json(result);

    return {
        recipes,
    };
});

module.exports = router;
