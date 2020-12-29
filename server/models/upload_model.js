const { query } = require('../models/mysqlcon');

const createRecipe = async (recipe) => {
    statement = `INSERT INTO recipe_upload SET ?`;
    query(statement, recipe, (err, result) => {
        if (err) throw err;
        console.log(result);
    });
};

module.exports = {
    createRecipe,
};
