let url_string = window.location.href;
let url = new URL(url_string);
let id = url.searchParams.get('id');

axios.get('/api/1.0/recipes/more', { params: { id: id } }).then((res) => {
    recipe = res.data.data;
    let classTitle = get('.single-post');
    let title = document.createElement('h3');
    title.innerHTML = recipe[0].title;
    classTitle.insertBefore(title, classTitle.childNodes[0]);
    //
    let className = get('.list-inline');
    let li_name = document.createElement('li');
    let author = li_name.setAttribute('class', 'list-inline-item');
    li_name.innerText = 'by' + ' ' + recipe[0].user_name;
    className.appendChild(li_name);
    //
    let classDate = get('.list-inline');
    let li_date = document.createElement('li');
    let date = li_date.setAttribute('class', 'list-inline-item');
    li_date.innerText = recipe[0].time_record;
    classDate.appendChild(li_date);
    //
    let img = document.createElement('img');
    img.src = recipe[0].main_photo[0];
    get('.single-post').appendChild(img);
    //
    let p = document.createElement('p');
    p.innerText = recipe[0].description;
    get('.single-post').appendChild(p);
    //
    let calories = get('.num_calories');
    calories.innerText = recipe[0].calories;
    //
    let carbo = get('.num_carbo');
    carbo.innerText = recipe[0].carbohydrates;
    //
    let protein = get('.num_protein');
    protein.innerText = recipe[0].proteins;
    //
    let fat = get('.num_fat');
    fat.innerText = recipe[0].fat;
    //
    for (let i = 0; i < recipe[0].ingredients.length; i++) {
        let all = get('.table table-bordered product-table');
        let tbody = get('.tbody1');
        let body = document.createElement('tr');
        let body_i = document.createElement('td');
        let body_g = document.createElement('td');
        body_i.innerText = recipe[0].ingredients[i];
        body_g.innerText = recipe[0].grams[i];
        // tbody.appendChild(body.appendChild(body_i));
        // tbody.appendChild(body.appendChild(body_g));
        body.appendChild(body_i);
        body.appendChild(body_g);
        tbody.appendChild(body);
    }
});

function get(selector) {
    return document.querySelector(selector);
}
