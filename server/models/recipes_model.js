const { query } = require('../models/mysqlcon');

const getAllRecipes = async () => {
    const recipesQuery =
        'SELECT * FROM recipe_upload INNER JOIN recipe_album ON recipe_upload.id = recipe_album.id ORDER BY recipe_upload.id';
    const recipes = await query(recipesQuery);

    for (let i = 0; i < recipes.length; i++) {
        const autoTime = recipes[i].time_record.toISOString();
        const time = autoTime.split('T')[0];

        const ingredients = JSON.parse(recipes[i].ingredients);
        const main_photo = JSON.parse(recipes[i].main_photo);
        const other_photo = JSON.parse(recipes[i].other_photo);
        const step_explain = JSON.parse(recipes[i].step_explain);
        const grams = JSON.parse(recipes[i].grams);
        recipes[i].ingredients = ingredients;
        recipes[i].main_photo = main_photo;
        recipes[i].other_photo = other_photo;
        recipes[i].step_explain = step_explain;
        recipes[i].grams = grams;
        recipes[i].time_record = time;
    }

    return {
        recipes,
    };
};

const getFitnessRecipes = async () => {
    const recipesQuery =
        'SELECT * FROM recipe_upload INNER JOIN recipe_album ON recipe_upload.id = recipe_album.id where recipe_album.category = "健身" ORDER BY recipe_upload.id';
    const recipes = await query(recipesQuery);

    for (let i = 0; i < recipes.length; i++) {
        const autoTime = recipes[i].time_record.toISOString();
        const time = autoTime.split('T')[0];
        recipes[i].time_record = time;

        const ingredients = JSON.parse(recipes[i].ingredients);
        const main_photo = JSON.parse(recipes[i].main_photo);
        const other_photo = JSON.parse(recipes[i].other_photo);
        const step_explain = JSON.parse(recipes[i].step_explain);
        const grams = JSON.parse(recipes[i].grams);
        recipes[i].ingredients = ingredients;
        recipes[i].main_photo = main_photo;
        recipes[i].other_photo = other_photo;
        recipes[i].step_explain = step_explain;
        recipes[i].grams = grams;
    }

    return { recipes };
};

const getBakingRecipes = async () => {
    const recipesQuery =
        'SELECT * FROM recipe_upload INNER JOIN recipe_album ON recipe_upload.id = recipe_album.id where recipe_album.category = "點心烘焙" ORDER BY recipe_upload.id';
    const recipes = await query(recipesQuery);

    for (let i = 0; i < recipes.length; i++) {
        const autoTime = recipes[i].time_record.toISOString();
        const time = autoTime.split('T')[0];
        recipes[i].time_record = time;

        const ingredients = JSON.parse(recipes[i].ingredients);
        const main_photo = JSON.parse(recipes[i].main_photo);
        const other_photo = JSON.parse(recipes[i].other_photo);
        const step_explain = JSON.parse(recipes[i].step_explain);
        const grams = JSON.parse(recipes[i].grams);
        recipes[i].ingredients = ingredients;
        recipes[i].main_photo = main_photo;
        recipes[i].other_photo = other_photo;
        recipes[i].step_explain = step_explain;
        recipes[i].grams = grams;
    }

    return { recipes };
};

const getRecipesDetails = async (id) => {
    const recipesQuery =
        'SELECT * FROM recipe_upload INNER JOIN recipe_album ON recipe_upload.id = recipe_album.id where recipe_upload.id = ? ORDER BY recipe_upload.id';
    const recipe = await query(recipesQuery, id);

    const autoTime = recipe[0].time_record.toISOString();
    const time = autoTime.split('T')[0];
    recipe[0].time_record = time;

    const ingredients = JSON.parse(recipe[0].ingredients);
    const main_photo = JSON.parse(recipe[0].main_photo);
    const other_photo = JSON.parse(recipe[0].other_photo);
    const step_explain = JSON.parse(recipe[0].step_explain);
    const grams = JSON.parse(recipe[0].grams);
    recipe[0].ingredients = ingredients;
    recipe[0].main_photo = main_photo;
    recipe[0].other_photo = other_photo;
    recipe[0].step_explain = step_explain;
    recipe[0].grams = grams;

    return { recipe };
};

const getRecipesSearch = async (key) => {
    const recipesQuery =
        'SELECT * FROM recipe_upload INNER JOIN recipe_album ON recipe_upload.id = recipe_album.id where recipe_upload.title like ? ORDER BY recipe_upload.id';
    const recipes = await query(recipesQuery, `%${key}%`);

    for (let i = 0; i < recipes.length; i++) {
        const autoTime = recipes[i].time_record.toISOString();
        const time = autoTime.split('T')[0];
        recipes[i].time_record = time;

        const ingredients = JSON.parse(recipes[i].ingredients);
        const main_photo = JSON.parse(recipes[i].main_photo);
        const other_photo = JSON.parse(recipes[i].other_photo);
        const step_explain = JSON.parse(recipes[i].step_explain);
        const grams = JSON.parse(recipes[i].grams);
        recipes[i].ingredients = ingredients;
        recipes[i].main_photo = main_photo;
        recipes[i].other_photo = other_photo;
        recipes[i].step_explain = step_explain;
        recipes[i].grams = grams;
    }

    return { recipes };
};

const recommendMeals = async (carbos, proteins, fats) => {
    const recipesSelect = `SELECT * FROM recipe_album INNER JOIN recipe_upload ON recipe_upload.id = recipe_album.id where recipe_album.carbohydrates between ${carbos}-10 AND ${carbos}+10 || recipe_album.proteins between ${proteins}-10 AND ${proteins}+10 || recipe_album.fat between ${fats}-10 AND ${fats}+10;`;
    const recipes = await query(recipesSelect);

    for (let i = 0; i < recipes.length; i++) {
        const autoTime = recipes[i].time_record.toISOString();
        const time = autoTime.split('T')[0];
        recipes[i].time_record = time;

        const ingredients = JSON.parse(recipes[i].ingredients);
        const main_photo = JSON.parse(recipes[i].main_photo);
        const step_explain = JSON.parse(recipes[i].step_explain);
        const grams = JSON.parse(recipes[i].grams);
        recipes[i].ingredients = ingredients;
        recipes[i].main_photo = main_photo;
        recipes[i].step_explain = step_explain;
        recipes[i].grams = grams;
    }

    return { recipes };
};

module.exports = {
    getAllRecipes,
    getFitnessRecipes,
    getBakingRecipes,
    getRecipesDetails,
    getRecipesSearch,
    recommendMeals,
};
