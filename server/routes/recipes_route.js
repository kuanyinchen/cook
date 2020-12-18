const router = require('express').Router();
const { IdentityStore } = require('aws-sdk');
const { query } = require('../models/mysqlcon');

router.get('/recipes/all', async (req, res) => {
    const recipeCounts = await query('SELECT COUNT(*) as count FROM recipeUpload');
    const recipeCount = recipeCounts[0].count;

    const recipesQuery =
        'SELECT * FROM recipeUpload INNER JOIN recipeAlbum ON recipeUpload.id = recipeAlbum.id ORDER BY recipeUpload.id';
    const recipes = await query(recipesQuery);

    for (let i = 0; i < recipes.length; i++) {
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

router.get('/recipes/fitness', async (req, res) => {
    const recipeCounts = await query('SELECT COUNT(*) as count FROM recipeAlbum where category = "健身"');
    const recipeCount = recipeCounts[0].count;

    const recipesQuery =
        'SELECT * FROM recipeUpload INNER JOIN recipeAlbum ON recipeUpload.id = recipeAlbum.id where recipeAlbum.category = "健身" ORDER BY recipeUpload.id';
    const recipes = await query(recipesQuery);

    for (let i = 0; i < recipes.length; i++) {
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
    const recipeCounts = await query('SELECT COUNT(*) as count FROM recipeAlbum where category = "點心烘焙"');
    const recipeCount = recipeCounts[0].count;

    const recipesQuery =
        'SELECT * FROM recipeUpload INNER JOIN recipeAlbum ON recipeUpload.id = recipeAlbum.id where recipeAlbum.category = "點心烘焙" ORDER BY recipeUpload.id';
    const recipes = await query(recipesQuery);

    for (let i = 0; i < recipes.length; i++) {
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

    const recipesQuery = `SELECT * FROM recipeUpload INNER JOIN recipeAlbum ON recipeUpload.id = recipeAlbum.id where recipeUpload.id = ${id} ORDER BY recipeUpload.id`;
    const recipe = await query(recipesQuery);

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

    const recipesQuery = `SELECT * FROM recipeUpload INNER JOIN recipeAlbum ON recipeUpload.id = recipeAlbum.id where recipeUpload.title like '%${key}%' ORDER BY recipeUpload.id`;
    const recipes = await query(recipesQuery);

    for (let i = 0; i < recipes.length; i++) {
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
module.exports = router;
