var eleId = 1;
var stepId = 1;

loadingredients = async () => {
    const res = await fetch('../data/ingredients.json');
    const ingredients = await res.json();
    for (let i = 0; i < ingredients.length; i++) {
        let ingredient = ingredients[i];
        //$("#matched_list").append('<option value="'ingredient.name'"></option>');
        $(`#matched_list${eleId - 1}`).append(`<option value=${ingredient.name}></option>`);
    }
};

window.onload = function () {
    loadingredients();
};

//畫面上原本的食材克數欄位
$(document).ready(function () {
    //let i = 0;
    const socket = io();
    const selectIngredientEle = document.querySelector('#ingredient0');
    const selectGramsEle = document.querySelector('#grams0');

    selectIngredientEle.addEventListener('change', (event) => {
        selectGramsEle.addEventListener('change', (event) => {
            set = {
                ingredient: selectIngredientEle.value,
                gram: selectGramsEle.value,
            };
            socket.emit('query_nutrition', set);
            return false;
        });
    });

    socket.on('nutrition_from_db', function (data) {
        document.getElementById('calories0').innerHTML = data.calories;
        document.getElementById('proteins0').innerHTML = data.protein;
        document.getElementById('fat0').innerHTML = data.fat;
        document.getElementById('carbohydrates0').innerHTML = data.carbohydrates;

        // document.getElementById('total_calories').innerHTML = data.calories;
        // document.getElementById('total_proteins').innerHTML = data.protein;
        // document.getElementById('total_fat').innerHTML = data.fat;
        // document.getElementById('total_carbohydrates').innerHTML = data.carbohydrates;
    });
});

//append新的食材克數格子 //原本的
$('#btn-add-row').click(() => {
    $('.rowADD').append(
        '<div class="row" id="div' +
            eleId +
            '"><input type="text" name="ingredient" id="ingredient' +
            eleId +
            '" placeholder="食材" list="matched_list' +
            eleId +
            '"  /><datalist id="matched_list' +
            eleId +
            '"></datalist><input type="text" name="grams" id="grams' +
            eleId +
            '" placeholder="克數" /><button type="button" class="btn-remove-row">-</button><br>熱量：<div name="calories" id="calories' +
            eleId +
            '" class="calories"></div>蛋白質：<div name="proteins" id="proteins' +
            eleId +
            '" class="protein"></div>碳水：<div name="carbohydrates" id="carbohydrates' +
            eleId +
            '" class="carbohydrates"></div>脂肪:<div name="fat" id="fat' +
            eleId +
            '" class="fat"></div></div>'
    );

    loadingredients();

    $(function () {
        let i = eleId;
        const socket = io();
        const selectIngredientEle = document.querySelector('#ingredient' + i);
        const selectGramsEle = document.querySelector('#grams' + i);

        selectIngredientEle.addEventListener('change', (event) => {
            selectGramsEle.addEventListener('change', (event) => {
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

            // document.getElementById('total_calories').innerHTML =
            //     parseInt(document.getElementById('total_calories').innerHTML) + data.calories;
            // document.getElementById('total_proteins').innerHTML =
            //     parseInt(document.getElementById('total_proteins').innerHTML) + data.protein;
            // document.getElementById('total_carbohydrates').innerHTML =
            //     parseInt(document.getElementById('total_carbohydrates').innerHTML) + data.carbohydrates;
            // document.getElementById('total_fat').innerHTML =
            //     parseInt(document.getElementById('total_fat').innerHTML) + data.fat;
        });
    });
    eleId++;
});

$('#btn-sum').click(() => {
    const cal = document.getElementsByClassName('calories');
    const pro = document.getElementsByClassName('protein');
    const carb = document.getElementsByClassName('carbohydrates');
    const fat = document.getElementsByClassName('fat');
    const total_cal = document.getElementById('total_calories');
    const total_pro = document.getElementById('total_proteins');
    const total_carbo = document.getElementById('total_carbohydrates');
    const total_f = document.getElementById('total_fats');
    calArray = [];
    for (let calories of cal) {
        calArray.push(parseInt(calories.innerHTML));
    }
    calArray.reduce((acc, curr) => (total_cal.innerHTML = acc + curr));

    proArray = [];
    for (let protein of pro) {
        proArray.push(parseInt(protein.innerHTML));
    }
    proArray.reduce((acc, curr) => (total_pro.innerHTML = acc + curr));

    carbArray = [];
    for (let carbo of carb) {
        carbArray.push(parseInt(carbo.innerHTML));
    }
    carbArray.reduce((acc, curr) => (total_carbo.innerHTML = acc + curr));

    fatArray = [];
    for (let f of carb) {
        fatArray.push(parseInt(f.innerHTML));
    }
    fatArray.reduce((acc, curr) => (total_f.innerHTML = acc + curr));
});

//Step_pic & Step_description
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

//form 送出的時候
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
