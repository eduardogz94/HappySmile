let User = require('./user_db');
let passport = require('passport');
let localStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');

module.exports = new localStrategy({
    usernameField: 'email',
    passwordField: 'password'
}, (username, password, done) => {
    User.getPersonByEmail(username).then((user) => {
        if (user.error) {
            return done(null, false, {
                case: "email",
                status: 404
            });
        }
        let hashedPass = bcrypt.hash(password, 10);
        User.comparePassword(password, user.password).then((isMatch) => {
            if (isMatch)
                return done(null, user);
            else
                return done(null, false, {
                    case: 'password'
                });
        }).catch((err) => {
            throw err;
        });
    }).catch((err) => {
        return done(null, false, {
            case: "email",
            status: 404
        });
        // throw err;
    });
});