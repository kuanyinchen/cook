axios.get('/api/1.0/recipes/baking').then((res) => {
    let recipeInfos = res.data.data;
    console.log(recipeInfos);
});
