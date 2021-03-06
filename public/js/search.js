let url_string = window.location.href;
let url = new URL(url_string);
let key = url.searchParams.get('key');

axios.get('/api/1.0/recipes/search', { params: { key: key } }).then((res) => {
    let recipeInfos = res.data.data.recipes;

    for (let i = 0; i < recipeInfos.length; i++) {
        let frame = document.createElement('div');
        frame.setAttribute('class', 'col-sm-12 col-lg-4 col-md-6');
        //
        let productCard = document.createElement('div');
        productCard.setAttribute('class', 'product-item bg-light');
        //
        let card = document.createElement('div');
        card.setAttribute('class', 'card');
        //thumb-content
        let card_content = document.createElement('div');
        card_content.setAttribute('class', 'thumb-content');
        //
        let a = document.createElement('a');
        a.href = 'single_recipe.html?id=' + recipeInfos[i].id;
        //
        let img = document.createElement('img');
        img.setAttribute('class', 'card-img-top img-fluid');
        img.src = recipeInfos[i].main_photo[0];
        //
        a.appendChild(img);
        card_content.appendChild(a);
        card.appendChild(card_content);
        // ----------------------------------------------//
        // -----------------div2-------------------------//
        let card_body = document.createElement('div');
        card_body.setAttribute('class', 'card-body');
        //
        let card_title = document.createElement('h4');
        card_title.setAttribute('class', 'card-title');
        let title_a = document.createElement('a');
        title_a.href = 'single_recipe.html?id=' + recipeInfos[i].id;
        title_a.innerText = recipeInfos[i].title;
        card_title.appendChild(title_a);
        card_body.appendChild(card_title);
        //
        let card_ul = document.createElement('ul');
        card_ul.setAttribute('class', 'list-inline product-meta');
        let card_li_1 = document.createElement('li');
        card_li_1.setAttribute('class', 'list-inline-item');
        let li_a = document.createElement('a');
        li_a.href = 'category_baking.html';
        li_a.innerText = recipeInfos[i].category;
        card_li_1.appendChild(li_a);
        card_ul.appendChild(card_li_1);
        //
        let card_li_2 = document.createElement('li');
        card_li_2.setAttribute('class', 'list-inline-item');
        let li_2_a = document.createElement('a');
        li_2_a.innerText = recipeInfos[i].time_record;
        card_li_2.appendChild(li_2_a);
        card_ul.appendChild(card_li_2);
        card_body.appendChild(card_ul);
        //
        let card_p = document.createElement('p');
        card_p.setAttribute('class', 'card-text');
        card_p.innerText = recipeInfos[i].description;
        card_body.appendChild(card_p);
        card.appendChild(card_body);
        //
        productCard.appendChild(card);
        //
        frame.appendChild(productCard);
        //
        row = get('.mt-30');
        row.appendChild(frame);
    }
});

function get(selector) {
    return document.querySelector(selector);
}

$('#search').on('click', () => {
    let keyword = document.getElementById('inputtext').value;
    window.location.href = `/search.html?key=${keyword}`;
});
