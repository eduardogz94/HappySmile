const db = require('./db');
const bcrypt = require('bcryptjs');

module.exports.getPatientByEmail = (email) => {
    return new Promise((res, rej) => {
        db.connect().then((obj) => {
            obj.one('SELECT * FROM patients WHERE email = $1', [email])
                .then(data => {
                    res(data);
                    obj.done();
                }).catch(err => {
                    rej(err)
                    obj.done()
                });
        }).catch(error => {
            rej(error)
        });
    });
}

module.exports.getAllPatients = () => {
    return new Promise((res, rej) => {
        db.connect().then((obj) => {
            obj.any('SELECT * FROM patients').then(data => {
                res(data);
                obj.done();
            }).catch(error => {
                rej(error);
                obj.done();
            });
        }).catch(error => {
            rej(error);
        });
    });
}

module.exports.newPatient = (id, history, pay, type, date) => {
    return new Promise((res, rej) => {
        db.connect().then((obj) => {
            obj.none('INSERT INTO patients(person_id, history_id, pay_id, type_id, date_registration) VALUES ($1,$2,$3,$4,$5)', 
                [id, history, pay, type, date])
                .then(data => {
                    res(data)
                    obj.none()
                }).catch(error => {
                    rej(error)
                    obj.none()
                });
        }).catch(error => {
            rej(error)
        });
    });
}

module.exports.newHistory = (id, history, pay, type, date) => {
    return new Promise((res, rej) => {
        db.connect().then((obj) => {
            obj.none('INSERT INTO clinic_history(person_id, history_id, pay_id, type_id, date_registration) VALUES ($1, $2, $3, $4, $5)', [id, history, pay, type, date])
                .then(data => {
                    res(data)
                    obj.none()
                }).catch(error => {
                    rej(error)
                    obj.none()
                });
        }).catch(error => {
            rej(error)
        });
    });
}