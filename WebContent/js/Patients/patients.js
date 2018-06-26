$ = (id) => document.getElementById(id);

validatePatient = (e) => {
    e.preventDefault();
    if (id.value == '') {
        $('fields-id').style.display = 'inline-block';
    } else {
        $('fields-id').style.display = 'none';
        checkPerson();
    }
}

checkPerson = () => {
    let email = $('patient-email');
    let name = $('patient-name');
    let cel = $('patient-cel');
    let age = $('patient-age');
    let gen = $('patient-gen');
    let last = $('patient-last');
    let date = $('register-date');
    let pay = $('patient-pay');
    let id = $('id');

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
            $('patients-id').style.display = 'none';
            $('patients-error').style.display = 'none';
        } else {
            switch (response.case) {
                case 'id':
                    $('patients-id').style.display = 'inline-block';
                    break;
                case 'request':
                    $('patients-error').style.display = 'inline-block';
                    break;
            }
        }
    })
}

addPatient = (e) => {
    e.preventDefault();
    
    let date = $('register-date');
    let pay = $('patient-pay');
    let id = $('id');

    const body = {
        id: id.value,
        registerDate: date.value,
        pay: pay.value
    }

    localStorage.setItem('id', id.value)
    localStorage.setItem('registerDate', date.value)
    localStorage.setItem('pay', pay.value)

    window.location.href = "./createhistory.html"
}

addHistory = (e) => {
    e.preventDefault();

    let cardio = $('history-cardio')
    let renals = $('history-renals')
    let intraoral = $('history-intraoral')
    let alergy = $('history-alergy')
    let threatment = $('history-threatment')
    let disseases = $('history-disseases')
    let cancer = $('history-cancer')
    let hemato = $('history-hemato')

    const body = {
        id: localStorage.getItem('id'),
        registerDate: localStorage.getItem('registerDate'),
        pay: localStorage.getItem('pay'),
        prob_hematologos: hemato,
        disseases: disseases,
        threatment: threatment,
        cancer_death: cancer,
        prob_penales: renals,
        prob_cardiovasculares: cardio,
        intraloral_test: intraoral,
        alergy_medicaments: false,
        alergy: alergy
    }

    fetching(body, 'POST', './patients/addPatient', response => {
        console.log(response)
        if (response.status == 200) {
            console.log("msg")
        } else {
            console.log("msg")
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