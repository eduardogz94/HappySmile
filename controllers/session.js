const express = require('express');
const passport = require('passport');
const auth = require('./../middlewares/isAuth')
let user = require('./../helpers/user_db');
let router = express.Router();

router.post('/login', auth.isLogged, (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) {
            return next(err);
        }
        if (!user) {
            console.log(info)
            switch (info.case) {
                case 'email':
                    return res.send({
                        case: "email",
                        status: 404
                    });
                    break;
                case 'password':
                    return res.send({
                        case: "password",
                        status: 403
                    });
                    break;
                default:
                    return res.send({
                        case: "forbidden",
                        status: 403
                    });
                    break;
            }
        }
        req.logIn(user, function(err) {
            if (err) {
                return res.status(500).send({
                    status: 'Could not log in user'
                });
            }
            res.send({
                status: 200
            });
        });
    })(req, res, next);
});


router.post('/newPerson', auth.isLogged, (req, res, next) => {
    const {
        name,
        lastname,
        username,
        password,
        email,
        address,
        celphone,
        familyContact,
        age,
        gen,
        id
    } = req.body;

    let hashedPass = bcrypt.hashSync(password, 10);

    user.newPerson(id, name, email, address, lastname, familyContact, celphone, gen, age, hashedPass, username).then(data => {
        res.send({
            msg: 'registered',
            status: 200
        })
    }).catch((err) => {
        console.log(err)
        switch (err.constraint) {
            case 'id':
                res.send({
                    case: "id",
                    status: 403
                });
                break;
            case 'email':
                res.send({
                    case: "email",
                    status: 403
                });
                break;
            case 'username':
                res.send({
                    case: "password",
                    status: 403
                });
                break;
            default:
                res.send({
                    case: "request",
                    status: 403
                });
                break;
        }
    });
});


router.get('/value', auth.isAuth, (req, res) => {
    res.send({
        session: req.session.passport,
        id: req.user.id,
        admin: req.user.admin
    });
});

router.get('/logout', auth.isAuth, (req, res) => {
    req.logout();
    res.send({
        status: 200,
    });
});


module.exports = router;