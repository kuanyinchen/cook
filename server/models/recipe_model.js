const { query } = require('../models/mysqlcon');

const createRecipe = async (recipe) => {
    statement = `INSERT INTO recipeUpload SET ?`;
    query(statement, recipe, (err, result) => {
        if (err) throw err;
        console.log(result);
    });
};

module.exports = {
    createRecipe,
};
