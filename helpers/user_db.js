const db = require('./db');
const bcrypt = require('bcryptjs');

module.exports.getPersonByEmail = (email) => {
    return new Promise((res, rej) => {
        db.connect().then((obj) => {
            obj.one('SELECT * FROM persons WHERE email=$1', [email])
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

module.exports.getPersonById = (id) => {
    return new Promise((res, rej) => {
        db.connect().then((obj) => {
            obj.one('SELECT * FROM persons WHERE person_id=$1', [id])
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

module.exports.getAllPersons = () => {
    return new Promise((res, rej) => {
        db.connect().then((obj) => {
            obj.any('SELECT * FROM persons').then(data => {
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

module.exports.newPerson = (id, name, email, address, lastname, familyContact, celphone, gen, age, password, username) => {
    return new Promise((res, rej) => {
        db.connect().then((obj) => {
            console.log({id, name, email, address, lastname, familyContact, celphone, gen, age, password, username})
            obj.none('INSERT INTO persons(person_id, name, email, direccion, lastname, fam_contact, cel, gen, age, password, username) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11)', 
                [id, name, email, address, lastname, familyContact, celphone, gen, age, password, username])
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

module.exports.comparePassword = (candidatePassword, hash) => {
    return new Promise((res, rej) => {
        let hashedPass = bcrypt.hash(candidatePassword, 10);
        bcrypt.compare(candidatePassword, hash, function(err, isMatch) {
            if (err) throw rej(err);
            res(isMatch);
        });
    });
};