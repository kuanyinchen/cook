var eleId = 1;
var stepId = 1;

$('#btn-add-row').click(() => {
    $('.element-wrapper').append(
        '<div class="row" id="div' +
            eleId +
            '"><input type="text" name="ingredient" id="ingredient' +
            eleId +
            '" placeholder="食材" /><input type="text" name="grams" id="grams' +
            eleId +
            '" placeholder="克數" /><button type="button" class="btn-remove-row">-</button><br>熱量：<div name="calories" id="calories' +
            eleId +
            '"></div>蛋白質：<div name="proteins" id="proteins' +
            eleId +
            '"></div>碳水：<div name="carbohydrates" id="carbohydrates' +
            eleId +
            '"></div>脂肪:<div name="fat" id="fat' +
            eleId +
            '"></div></div>'
    );
    const socket = io();
    $(function () {
        let i = eleId;
        const selectIngredientEle = document.querySelector('#ingredient' + i);
        const selectGramsEle = document.querySelector('#grams' + i);
        [selectIngredientEle, selectGramsEle].forEach((ele) => {
            ele.addEventListener('change', (event) => {
                set = {
                    ingredient: selectIngredientEle.value,
                    gram: selectGramsEle.value,
                };
                socket.emit('query_nutrition', set);
                return false;
            });
        });
        socket.on('nutrition_from_db', function (data) {
            document.getElementById('calories' + i).innerHTML = data.calories;
            document.getElementById('proteins' + i).innerHTML = data.protein;
            document.getElementById('fat' + i).innerHTML = data.fat;
            document.getElementById('carbohydrates' + i).innerHTML = data.carbohydrates;
            document.getElementById('total_calories').innerHTML =
                parseInt(document.getElementById('total_calories').innerHTML) + data.calories;
            document.getElementById('total_proteins').innerHTML =
                parseInt(document.getElementById('total_proteins').innerHTML) + data.protein;
            document.getElementById('total_carbohydrates').innerHTML =
                parseInt(document.getElementById('total_carbohydrates').innerHTML) + data.carbohydrates;
            document.getElementById('total_fat').innerHTML =
                parseInt(document.getElementById('total_fat').innerHTML) + data.fat;
        });
    });
    eleId++;
});

$('#btn-add-step').click(() => {
    $('.element-wrapper1').append(
        '<div id="div' +
            stepId +
            '"><input type="file" class="form-control-file" name="step_p" multiple /><textarea name="step_d" id ="step_d' +
            stepId +
            '"placeholder="說明" /></textarea><button type="button" class="btn-remove-step">-</button></div>'
    );
    stepId++;
});

$('#click').on('click', function () {
    let title = document.getElementById('title').value;
    let sum_calories = document.getElementById('total_calories').innerHTML;
    let sum_proteins = document.getElementById('total_proteins').innerHTML;
    let sum_carbohydrates = document.getElementById('total_carbohydrates').innerHTML;
    let sum_fat = document.getElementById('total_fat').innerHTML;
    let category = document.getElementById('category').value;
    let set = [sum_calories, sum_proteins, sum_carbohydrates, sum_fat, title, category]; //[1,2,3,4]

    socket.emit('total_nutritions', set); //傳最後加總的營養素到Server
});

//search ingredients.json and filter
const ingredient = document.getElementById('ingredient0');
const match = document.getElementById('matched_list');
const searchIngredient = async (searchText) => {
    const res = await fetch('../data/ingredients.json');
    const ingredients = await res.json();

    //get matches to current text input
    let matches = ingredients.filter((ingredient) => {
        const regex = new RegExp(`${searchText}`, 'gi');
        return ingredient.name.match(regex);
    });
    if (searchText.length === 0) {
        matches = [];
        matched_list.innerHTML = '';
    }
    outputHTML(matches);
};

const outputHTML = (matches) => {
    if (matches.length > 0) {
        const html = matches.map((match) => `<div class="card"><h4>${match.name}</span></h4></div>)`).join('');

        matched_list.innerHTML = html;
    }
};

ingredient.addEventListener('input', () => searchIngredient(ingredient.value));
