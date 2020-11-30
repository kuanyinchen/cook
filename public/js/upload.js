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
            '" placeholder="克數" /><div name="calories" id="calories' +
            eleId +
            '">熱量：</div><div name="proteins" id="proteins' +
            eleId +
            '">蛋白質：</div><div name="carbohydrates" id="carbohydrates' +
            eleId +
            '">碳水：</div><div name="fat" id="fat' +
            eleId +
            '">脂肪</div><button class="btn-remove-row">-</button></div>'
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
            document.getElementById('calories' + i).innerHTML = '熱量：' + data.calories;
            document.getElementById('proteins' + i).innerHTML = '蛋白質：' + data.protein;
            document.getElementById('fat' + i).innerHTML = '脂肪：' + data.fat;
            document.getElementById('carbohydrates' + i).innerHTML = '碳水：' + data.carbohydrates;
        });
    });
    eleId++;
});

$('#btn-add-step').click(() => {
    $('.element-wrapper1').append(
        '<div id="div' +
            stepId +
            '"><input type="file" class="form-control-file" name="step_p" multiple /><input type="text" name="step_d" id ="step_d' +
            stepId +
            '"placeholder="說明" /><button class="btn-remove-step">-</button></div>'
    );
    stepId++;
});
