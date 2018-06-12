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
            return res.status(200).send({
                status: info
            });
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


router.post('/signup', auth.isLogged, (req, res, next) => {
    const { name, lastname, username, password, email } = req.body;

    user.new(name, lastname, username, password, email).then((data) => {
        res.send({
            status: 200
        })
    }).catch((err) => {
        switch (err.constraint) {
            case 'email':
                res.send({
                    status: 401
                });
                break;
            case 'username':
                res.send({
                    status: 402
                });
                break;
            default:
                res.send({
                    status: 404
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
    res.status(200).send({
        status: 200,
    });
});

module.exports = router;