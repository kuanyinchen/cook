axios.get('/api/1.0/recipes/baking').then((res) => {
    let recipeInfos = res.data.data;

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
        a.href = 'testSinglePost.html';
        //
        let img = document.createElement('img');
        img.setAttribute('class', 'card-img-top img-fluid');
        img.src = recipeInfos[i].main_photo[1];
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
        title_a.href = 'testSinglePost.html';
        title_a.innerText = recipeInfos[i].title;
        card_title.appendChild(title_a);
        card_body.appendChild(card_title);
        //
        let card_ul = document.createElement('ul');
        card_ul.setAttribute('class', 'list-inline product-meta');
        let card_li_1 = document.createElement('li');
        card_li_1.setAttribute('class', 'list-inline-item');
        let li_a = document.createElement('a');
        li_a.href = 'testSinglePost.html';
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
