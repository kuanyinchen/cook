const eleId = 1;
const stepId = 1;

$('#btn-add-row').click(() => {
    var row = $('#rowTest').clone().show();
    $('.element-wrapper').append(
        '<div id="div' +
            eleId +
            '"><input type="text" name="ingredient" placeholder="食材" /><input type="text" name="grams" placeholder="克數" /><input type="text" name="calories" placeholder="熱量" /><input type="text" name="calories" placeholder="蛋白質" /><input type="text" name="calories" placeholder="碳水" /><input type="text" name="calories" placeholder="脂肪" /><button class="btn-remove-row">-</button></div>'
    );
    eleId++;
});

$('#btn-add-step').click(() => {
    var row = $('#stepbystep').clone().show();
    $('.element-wrapper1').append(
        '<div id="div' +
            stepId +
            '"><input type="file" class="form-control-file" name="step_p" multiple /><input type="text" name="step_d" placeholder="說明" /><button class="btn-remove-step">-</button></div>'
    );
    stepId++;
});
