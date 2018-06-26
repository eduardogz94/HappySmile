const express = require('express');
let patient = require('./../helpers/patient_db');
let router = express.Router();

router.post('/addPatient', (req, res) => {
    let {
        id,
        registerDate,
        pay,
        hemato,
        disseases,
        threatment,
        cancer,
        renals,
        cardio,
        intraoral,
        alergy_medicaments,
        alergy
    } = req.body;

    const history = 0;
    const type = 1;

    if (pay == 'Paid') {
        pay = 1;
    } else {
        pay = 0;
    }

    console.log(req.body)

    // patient.newPatient(id, history, pay, type, registerDate).then(data => {
    //     console.log(data)
    // }).catch(err => {
    //     console.log(err)
    // })
    
})



module.exports = router;