const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const UserModel = require('../models/user.model.js');
const sanitizeUser = require('../helper/sanitizeUser.helper.js');

/** 
 * @jwt strategy
*/

const opts = {}
opts['jwtFromRequest'] = ExtractJwt.fromAuthHeaderAsBearerToken();
opts['secretOrKey'] = process.env.AUTHORIZATION_SECRET_KEY;
opts['issuer'] = process.env.SECRECT_ISSUER;


const PassportJWTStrategy =  new JwtStrategy(opts, async (jwt_payload, done) => {

   const user = await UserModel.findById({_id : jwt_payload.id});

   if(!user) return done(null, false);

   return done(null, sanitizeUser(user))
});


module.exports = PassportJWTStrategy;