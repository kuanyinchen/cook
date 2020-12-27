let genders = document.querySelectorAll('input[name="gender"]');
let activity = document.querySelectorAll('input[name="activity"]');
let distribution = document.querySelectorAll('input[name="distribution"]');

const BMR = () => {
    genders.forEach((elem) => {
        elem.addEventListener('change', (event) => {
            let gender = event.target.value;
            let ages = parseInt(document.getElementById('age').value);
            let heights = parseInt(document.getElementById('cm').value);
            let weights = parseInt(document.getElementById('kg').value);

            if (!ages || !heights || !weights) return;

            if (gender == 'male') {
                document.getElementById('bmr').value = Math.round(calculate(ages, heights, weights) + 5);
            } else {
                document.getElementById('bmr').value = Math.round(calculate(ages, heights, weights) - 161);
            }
        });
    });
    document.getElementById('age').addEventListener('change', (event) => {
        let ages = parseInt(event.target.value);
        let gender = document.querySelector('[name="gender"]:checked').value;
        let heights = parseInt(document.getElementById('cm').value);
        let weights = parseInt(document.getElementById('kg').value);

        if (!gender || !heights || !weights) return;

        if (gender == 'male') {
            document.getElementById('bmr').value = Math.round(calculate(ages, heights, weights) + 5);
        } else {
            document.getElementById('bmr').value = Math.round(calculate(ages, heights, weights) - 161);
        }
    });

    document.getElementById('cm').addEventListener('change', (event) => {
        let heights = parseInt(event.target.value);
        let ages = parseInt(document.getElementById('age').value);
        let gender = document.querySelector('[name="gender"]:checked').value;
        let weights = parseInt(document.getElementById('kg').value);

        if (!gender || !heights || !weights) return;

        if (gender == 'male') {
            document.getElementById('bmr').value = Math.round(calculate(ages, heights, weights) + 5);
        } else {
            document.getElementById('bmr').value = Math.round(calculate(ages, heights, weights) - 161);
        }
    });

    document.getElementById('kg').addEventListener('change', (event) => {
        let weights = parseInt(event.target.value);
        let ages = parseInt(document.getElementById('age').value);
        let gender = document.querySelector('[name="gender"]:checked').value;
        let heights = parseInt(document.getElementById('cm').value);

        if (!gender || !heights || !weights) return;

        if (gender == 'male') {
            document.getElementById('bmr').value = Math.round(calculate(ages, heights, weights) + 5);
        } else {
            document.getElementById('bmr').value = Math.round(calculate(ages, heights, weights) - 161);
        }
    });

    activity.forEach((elem) => {
        elem.addEventListener('click', (event) => {
            let BMR = document.getElementById('bmr').value;
            let active = document.querySelector('[name="activity"]:checked').value;

            if (!active || !BMR) return;

            if (active == '1') {
                document.getElementById('tdee').value = Math.round(BMR * 1.2);
            } else if (active == '2') {
                document.getElementById('tdee').value = Math.round(BMR * 1.375);
            } else if (active == '3') {
                document.getElementById('tdee').value = Math.round(BMR * 1.55);
            } else if (active == '4') {
                document.getElementById('tdee').value = Math.round(BMR * 1.725);
            } else {
                document.getElementById('tdee').value = Math.round(BMR * 1.9);
            }
        });
    });

    document.getElementById('bmr').addEventListener('onpropertychange', (event) => {
        let BMR = event.target.value;
        let active = document.querySelector('[name="activity"]:checked').value;

        if (!active || !BMR) return;

        if (active == '1') {
            document.getElementById('tdee').value = Math.round(BMR * 1.2);
        } else if (active == '2') {
            document.getElementById('tdee').value = Math.round(BMR * 1.375);
        } else if (active == '3') {
            document.getElementById('tdee').value = Math.round(BMR * 1.55);
        } else if (active == '4') {
            document.getElementById('tdee').value = Math.round(BMR * 1.725);
        } else {
            document.getElementById('tdee').value = Math.round(BMR * 1.9);
        }
    });

    distribution.forEach((elem) => {
        elem.addEventListener('click', (event) => {
            let TDEE = document.getElementById('tdee').value;
            let distribute = document.querySelector('[name="distribution"]:checked').value;

            if (!TDEE || !distribute) return;

            if (distribute == '1') {
                document.getElementById('C').value = Math.round((TDEE * 0.5) / 4) + 'g';
                document.getElementById('P').value = Math.round((TDEE * 0.3) / 4) + 'g';
                document.getElementById('F').value = Math.round((TDEE * 0.2) / 9) + 'g';
            } else {
                document.getElementById('C').value = Math.round((TDEE * 0.25) / 4) + 'g';
                document.getElementById('P').value = Math.round((TDEE * 0.45) / 4) + 'g';
                document.getElementById('F').value = Math.round((TDEE * 0.3) / 9) + 'g';
            }
        });
    });

    document.getElementById('tdee').addEventListener('onpropertychange', (event) => {
        let TDEE = event.target.value;
        let distribute = document.querySelector('[name="distribution"]:checked').value;

        if (!TDEE || !distribute) return;

        if (distribute == '1') {
            document.getElementById('C').value = Math.round((TDEE * 0.5) / 4) + 'g';
            document.getElementById('P').value = Math.round((TDEE * 0.3) / 4) + 'g';
            document.getElementById('F').value = Math.round((TDEE * 0.2) / 9) + 'g';
        } else {
            document.getElementById('C').value = Math.round((TDEE * 0.25) / 4) + 'g';
            document.getElementById('P').value = Math.round((TDEE * 0.45) / 4) + 'g';
            document.getElementById('F').value = Math.round((TDEE * 0.3) / 9) + 'g';
        }
    });
};

BMR();

const calculate = (ages, cm, kg) => {
    return 10 * kg + 6.25 * cm - 5 * ages;
};

$('#click').on('click', () => {
    let BMR = parseInt(document.getElementById('bmr').value);
    let TDEE = parseInt(document.getElementById('tdee').value);
    let carbos = parseInt(document.getElementById('C').value);
    let proteins = parseInt(document.getElementById('P').value);
    let fats = parseInt(document.getElementById('F').value);

    axios
        .post('/api/1.0/meals/calculate', { carbos: carbos, proteins: proteins, fats: fats, bmr: BMR, tdee: TDEE })
        .then((res) => {
            recipes = res.data.data;

            // for (let i = 0; i < recipes.length; i++) {
            //     let block = get('.trending-ads-slide');
            //     //
            //     let column = document.createElement('div');
            //     column.setAttribute('class', 'col-sm-12 col-lg-4');
            //     //
            //     let recipe = document.createElement('div');
            //     recipe.setAttribute('class', 'product-item bg-light');
            //     //
            //     let recipe_card = document.createElement('div');
            //     recipe_card.setAttribute('class', 'card');
            //     //卡片裡面資訊
            //     let thumb_content = document.createElement('div');
            //     thumb_content.setAttribute('class', 'thumb_content');
            //     //
            //     let a = document.createElement('a');
            //     a.href = 'single_recipe.html?id=' + recipes[i].id;
            //     //
            //     let img = document.createElement('img');
            //     img.setAttribute('class', 'card-img-top img-fluid');
            //     img.src = recipes[i].main_photo[1];
            //     //
            //     a.appendChild(img);
            //     thumb_content.appendChild(a);
            //     //
            //     let card_body = document.createElement('div');
            //     card_body.setAttribute('class', 'card-body');
            //     //
            //     let h4 = document.createElement('h4');
            //     h4.setAttribute('class', 'card-title');
            //     let h4_a = document.createElement('a');
            //     h4_a.href = 'single_recipe.html?id=' + recipes[i].id;
            //     h4.appendChild(h4_a);
            //     //
            //     let p = document.createElement('p');
            //     p.setAttribute('class', 'card-text');
            //     p.innerText = recipes[i].description;
            //     //
            //     card_body.appendChild(h4);
            //     card_body.appendChild(p);
            //     //
            //     recipe_card.appendChild(thumb_content);
            //     recipe_card.appendChild(card_body);
            //     //
            //     recipe.appendChild(recipe_card);
            //     //
            //     column.appendChild(recipe);
            //     //
            //     block.appendChild(column);
            // }
            for (let i = 0; i < recipes.length; i++) {
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
                a.href = 'single_recipe.html?id=' + recipes[i].id;
                //
                let img = document.createElement('img');
                img.setAttribute('class', 'card-img-top img-fluid');
                img.src = recipes[i].main_photo[1];
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
                title_a.href = 'single_recipe.html?id=' + recipes[i].id;
                title_a.innerText = recipes[i].title;
                card_title.appendChild(title_a);
                card_body.appendChild(card_title);
                //
                let card_ul = document.createElement('ul');
                card_ul.setAttribute('class', 'list-inline product-meta');
                let card_li_1 = document.createElement('li');
                card_li_1.setAttribute('class', 'list-inline-item');
                let li_a = document.createElement('a');
                li_a.href = 'category_baking.html';
                li_a.innerText = recipes[i].category;
                card_li_1.appendChild(li_a);
                card_ul.appendChild(card_li_1);
                //
                let card_li_2 = document.createElement('li');
                card_li_2.setAttribute('class', 'list-inline-item');
                let li_2_a = document.createElement('a');
                li_2_a.innerText = recipes[i].time_record;
                card_li_2.appendChild(li_2_a);
                card_ul.appendChild(card_li_2);
                card_body.appendChild(card_ul);
                //
                let card_p = document.createElement('p');
                card_p.setAttribute('class', 'card-text');
                card_p.innerText = recipes[i].description;
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
        })
        .catch((err) => {
            console.log(err);
        });
    // $('.slider').owlCarousel({
    //     loop: true,
    //     autoplay: true,
    //     autoplayTimeout: 2000, //2000ms = 2s;
    //     autoplayHoverPause: true,
    // });
});

function get(selector) {
    return document.querySelector(selector);
}
