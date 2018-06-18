$ = (id) => document.getElementById(id);

let email = $('email');
let username = $('username');
let password = $('password');
let name = $('name');
let lastname = $('lastname');
let address = $('address');
let celphone = $('celphone');
let familyContact = $('fam-contact');
let age = $('age');
let gen = $('gen');
let id = $('id');

validateLogin = (e) => {
    e.preventDefault();
    if (email.value == '' || password.value == '') {
        handleLog(email, password);
        $('fields-error').style.display = 'inline-block';
    } else {
        handleLog(email, password);
        $('fields-error').style.display = 'none';
        fetchLogin();
    }
}

validateSignup = (e) => {
    e.preventDefault();
    if (email.value == '' || username.value == '' || password.value == '' || name.value == '' || lastname.value == '' ||
        address.value == '' || celphone.value == '' || familyContact.value == '' || age.value == '' || gen.value == '' || id.value == '') {
        handleSign(name, lastname, username, email, password, address, celphone, familyContact, age, gen, id);
        // $('sign-error').style.display = 'inline-block';
    } else {
        handleSign(name, lastname, username, email, password, address, celphone, familyContact, age, gen, id);
        // $('sign-error').style.display = 'none';
        newPerson();
    }
}

validateBox = () => {
    let box = $('check');
    if (box.checked) {
        box.setAttribute('value', '1');
        box.setAttribute('disable', 'true');
        newPerson();
    } else {
        box.setAttribute('value', '0');
        box.setAttribute('disable', 'false');
        $('sign-war').style.display = 'inline-block';
    }
}

handleSign = (name, lastname, username, email, password, address, celphone, familyContact, age, gen, id) => {
    let sign = [name, lastname, username, email, password, address, celphone, familyContact, age, gen, id];
    for (var i = 0; i < 11; i++) {
        switch (sign[i].name) {
            case 'name':
                if (sign[i].value == '') {
                    $('name-war').style.display = 'inline-block'
                    $('name-ok').style.display = 'none'
                } else {
                    $('name-ok').style.display = 'inline-block'
                    $('name-war').style.display = 'none'
                }
                break;
            case 'lastname':
                if (sign[i].value == '') {
                    $('lastname-war').style.display = 'inline-block'
                    $('lastname-ok').style.display = 'none'
                } else {
                    $('lastname-ok').style.display = 'inline-block'
                    $('lastname-war').style.display = 'none'
                }
                break;
            case 'email':
                if (sign[i].value == '') {
                    $('email-war').style.display = 'inline-block'
                    $('email-ok').style.display = 'none'
                } else {
                    $('email-ok').style.display = 'inline-block'
                    $('email-war').style.display = 'none'
                }
                break;
            case 'username':
                if (sign[i].value == '') {
                    $('username-war').style.display = 'inline-block'
                    $('username-ok').style.display = 'none'
                } else {
                    $('username-ok').style.display = 'inline-block'
                    $('username-war').style.display = 'none'
                }
                break;
            case 'password':
                if (sign[i].value == '') {
                    $('password-war').style.display = 'inline-block'
                    $('password-ok').style.display = 'none'
                } else {
                    $('password-ok').style.display = 'inline-block'
                    $('password-war').style.display = 'none'
                }
                break;
        }
    }
}

handleLog = (email, password) => {
    let loging = [email, password];
    for (var i = 0; i < 2; i++) {
        switch (loging[i].name) {
            case 'email':
                if (loging[i].value == '') {
                    $('email-war').style.display = 'inline-block'
                    $('email-ok').style.display = 'none'
                } else {
                    $('email-ok').style.display = 'inline-block'
                    $('email-war').style.display = 'none'
                }
                break;
            case 'password':
                if (loging[i].value == '') {
                    $('password-war').style.display = 'inline-block'
                    $('password-ok').style.display = 'none'
                } else {
                    $('password-ok').style.display = 'inline-block'
                    $('password-war').style.display = 'none'
                }
                break;
        }
    }
}

fetchLogin = () => {

    const body = {
        email: email.value,
        password: password.value
    }

    fetching(body, 'POST', './Login', response => {
        console.log(response)
        if (response.status == 200) {
            localStorage.setItem('email', email)
            $('login-sucess').style.display = 'inline-block';
        } else {
            switch (response.case) {
                case 'email':
                    $('login-email').style.display = 'inline-block';
                    break;
                case 'password':
                    $('login-password').style.display = 'inline-block';
                    break;
                case 'forbidden':
                    $('login-error').style.display = 'inline-block';
                    break;
            }
        }
    })
}

logOut = () => {

    const body = {}

    fetching(body, 'GET', './Logout', response => {
        if (response.status == 200) {
            localStorage.removeItem('email');
            alert('logged out')
        } else {
            alert('Youre not logged in')
        }
    })
}

newPerson = () => {

    const body = {
        email: email.value,
        username: username.value,
        name: name.value,
        lastname: lastname.value,
        password: password.value,
        address: address.value,
        celphone: celphone.value,
        familyContact: familyContact.value,
        age: age.value,
        gen: gen.value,
        id: id.value
    }

    fetching(body, 'POST', './newPerson', response => {
        console.log(response)
        if (response.status == 200) {
            $('person-sucess').style.display = 'inline-block';
        } else {
            switch (response.case) {
                case 'email':
                    $('person-email').style.display = 'inline-block';
                    break;
                case 'id':
                    $('person-id').style.display = 'inline-block';
                    break;
                case 'username':
                    $('person-username').style.display = 'inline-block';
                    break;
                case 'request':
                    $('person-error').style.display = 'inline-block';
                    break;
            }
        }
    })
}