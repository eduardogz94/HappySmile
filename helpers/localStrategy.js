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
        console.log(`this is the reqbody password ${password}`);
        console.log(`this is the user password ${user.password}`);
        let hashedPass = bcrypt.hash(password, 10);
        User.comparePassword(password, user.password).then((isMatch) => {
            console.log(isMatch);
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