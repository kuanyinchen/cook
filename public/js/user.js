$('#Register').on('click', () => {
    let name = document.getElementById('r_name').value;
    let email = document.getElementById('r_email').value;
    let password = document.getElementById('r_password').value;

    axios
        .post('/api/1.0/user/registered', { r_name: name, r_email: email, r_password: password })
        .then((res) => {
            jwtToken = res.data.jwtToken;
            window.localStorage.setItem('jwtToken', jwtToken);
            window.location.replace('/');
        })
        .catch((err) => {
            console.log(err);
        });
});

$('#login').on('click', () => {
    let mail = document.getElementById('mail').value;
    let password = document.getElementById('password').value;

    axios
        .post('/api/1.0/user/login', { mail: mail, password: password })
        .then((res) => {
            jwtToken = res.data.jwtToken;
            window.localStorage.setItem('jwtToken', jwtToken);
            window.location.replace('/');
        })
        .catch((err) => {
            console.log(err);
        });
});
