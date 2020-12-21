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
