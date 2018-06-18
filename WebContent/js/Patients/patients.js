$ = (id) => document.getElementById(id);

let date = $('register-date');
let email = $('patient-email');
let name = $('patient-name');
let pay = $('patient-pay');
let cel = $('patient-cel');
let age = $('patient-age');
let gen = $('patient-gen');
let last = $('patient-last');
let id = $('id');

validatePatient = (e) => {
    e.preventDefault();
    if (id.value == '') {
        console.log("null")
    } else {
        checkPerson();
    }
}

checkPerson = () => {

    const body = {
        id: id.value
    }

    fetching(body, 'POST', './persons/checkPerson', response => {
        console.log(response)
        if (response.status == 200) {
            showDivs()
            email.value = response.user.email;
            name.value = response.user.name;
            pay.value = response.user.pay;
            cel.value = response.user.cel;
            age.value = response.user.age;
            gen.value = response.user.gen;
            last.value = response.user.lastname;
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

showDivs = () => {
    $('email-patient-div').style.display = 'inline-block'
    $('age-patient-div').style.display = 'inline-block'
    $('gen-patient-div').style.display = 'inline-block'
    $('cel-patient-div').style.display = 'inline-block'
    $('name-patient-div').style.display = 'inline-block'
    $('lastname-patient-div').style.display = 'inline-block'
}