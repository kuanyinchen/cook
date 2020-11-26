const _ = require('lodash');
const pageSize = 6;

const createRecipe = async (req, res) => {
    //const body = req.body;
    console.log('recipe_controller');
    res.send('hey');
};

module.exports = {
    createRecipe,
};
