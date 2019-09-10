'use strict'

const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;

const secreKeyPassport = 'COSTAPP';

const opts = {};
opts.jwtFromRequest = ExtractJWT.fromHeader('authorization');
opts.secretOrKey = secreKeyPassport;

function authentcated(jwtPayload, done) {
   const expirationDate = new Date(jwtPayload.exp * 1000);
   if (new Date() > expirationDate) return done(null, false, {message: 'La fecha de expiracion del token se ha cumplido'});
   return done(null, jwtPayload);
}

module.exports = (passport) => {
    passport.use(new JWTStrategy(opts, authentcated));
}



