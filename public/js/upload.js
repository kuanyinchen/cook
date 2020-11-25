console.log('click')

$('body').on('click', '#add_row', function () {
    $('#template').find('.row_data').clone().appendTo($('#append_position'))
})

$('#example').on('change', '.a_row', function (event) {
    event.preventDefault()
    var row_total = 0
    $('.a_row').each(function (index, el) {
        row_total = row_total + Number($(this).val())
    })

    $('#total').html('a_row_total = ' + row_total)
    console.log(row_total)
})

$('#example').on('change', '.b_row', function (event) {
    event.preventDefault()
    var row_total = 0
    $('.b_row').each(function (index, el) {
        row_total = row_total + Number($(this).val())
    })

    $('#total').html('b_row_total = ' + row_total)
    console.log(row_total)
})

$('#example').on('change', '.c_row', function (event) {
    event.preventDefault()
    var row_total = 0
    $('.c_row').each(function (index, el) {
        row_total = row_total + Number($(this).val())
    })

    $('#total').html('c_row_total = ' + row_total)
    console.log(row_total)
})
