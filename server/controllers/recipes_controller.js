const Recipes = require('../models/recipes_model');

const getAllRecipes = async (req, res) => {
    const allRecipes = await Recipes.getAllRecipes();

    const result = { data: allRecipes };

    res.status(200).send(result);
};

const getFitnessRecipes = async (req, res) => {
    const fitnessRecipes = await Recipes.getFitnessRecipes();

    const result = { data: fitnessRecipes };

    res.status(200).send(result);
};

const getBakingRecipes = async (req, res) => {
    const bakingRecipes = await Recipes.getBakingRecipes();

    const result = { data: bakingRecipes };

    res.status(200).send(result);
};

const getRecipesDetails = async (req, res) => {
    const id = req.query.id;

    const recipeDetails = await Recipes.getRecipesDetails(id);

    const result = { data: recipeDetails };

    res.status(200).send(result);
};

const getRecipesSearch = async (req, res) => {
    let key = req.query.key;

    const recipesSearch = await Recipes.getRecipesSearch(key);

    const result = { data: recipesSearch };

    res.status(200).send(result);
};

const recommendMeals = async (req, res) => {
    const body = req.body;

    const carbos = Math.round(body.carbos / 3);
    const proteins = Math.round(body.proteins / 3);
    const fats = Math.round(body.fats / 3);

    const meals = await Recipes.recommendMeals(carbos, proteins, fats);

    const result = { data: meals };
    res.status(200).send(result);
};

module.exports = {
    getAllRecipes,
    getFitnessRecipes,
    getBakingRecipes,
    getRecipesDetails,
    getRecipesSearch,
    recommendMeals,
};
