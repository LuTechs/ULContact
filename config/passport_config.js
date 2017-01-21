/**
 * Created by lengung on 10/05/2016.
 */

var LocalStrategy = require('passport-local').Strategy;
var Model = require('../models');

module.exports = function (passport) {
    // used to serialize the user for the session
    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });
    // used to deserialize the user
    passport.deserializeUser(function (id, done) {
        Model.User
            .findOne({
                where: {id: id},
                raw: true,
            })
            .then(function (user) {
                done(null, user)
                return null;
            })
            .catch(function (err) {
                done(err, null);
            });

    });

    //Local Login
    passport.use(new LocalStrategy({
            usernameField: 'email',
            passwordField: 'password',
            passReqToCallback: true
        },
        function (req, email, password, done) {
            Model.User
                .findOne({
                    where: {email: email},
                    raw: true,
                })
                .then(function (user) {
                    if (!user) {
                        return {isValid: false}
                    } else {
                        return Model.User.isValidPassword(password, user);
                    }
                })
                .then((validationObject)=> {
                    if (validationObject.isValid) {
                        return done(null, validationObject.user);
                    } else {
                        req.session.loginEmail=email;
                        return done(null, false, req.flash('loginMessage', 'Oops! Wrong password or user'));
                    }
                })
                .catch(err=> {
                    return done(null, false, {'loginMessage': err});
                });
        }
    ));

}
