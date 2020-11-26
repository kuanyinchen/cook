$('body').on('click', '#add_row', function () {
    $('#template').find('.row_data').clone().appendTo($('#append_position'))
})

$('body').on('click', '#add_step', function () {
    $('#stepbystep').find('.step_data').clone().appendTo($('#append_step'))
})
