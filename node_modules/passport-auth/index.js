'use strict'


const auth = require('./jwt/authenticated');
module.exports = (passport) => {
    passport.serializeUser((user, done) => {
        done(null, user._id);
    });


    auth(passport);
}