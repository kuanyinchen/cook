const router = require('express').Router();

const {
    getAllRecipes,
    getFitnessRecipes,
    getBakingRecipes,
    getRecipesDetails,
    getRecipesSearch,
    recommendMeals,
} = require('../controllers/recipes_controller');

router.route('/recipes/all').get(getAllRecipes);
router.route('/recipes/fitness').get(getFitnessRecipes);
router.route('/recipes/baking').get(getBakingRecipes);
router.route('/recipes/more').get(getRecipesDetails);
router.route('/recipes/search').get(getRecipesSearch);

router.route('/meals/calculate').post(recommendMeals);

module.exports = router;
