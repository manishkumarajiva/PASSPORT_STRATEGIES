const LocalStrategy = require('passport-local');
const UserModel = require('../models/user.model.js');
const crypto = require('crypto');
const {sanitizeUser} = require('../helper/sanitization.helper.js');


const PassportLocalStrategy = new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
},async function verify(username, password, cb) {
    try {
        const userExist = await UserModel.findOne({ username : username });
        
        /** @IF not exist __create__ @then login @ELSE login */

        if(!userExist) {
          const salt = crypto.randomBytes(16)

          crypto.pbkdf2(password, salt, 310000, 32, 'sha256', async function(err, hashedPassword) {
           
            if (err) return cb(err); 
  
            const createNewUser = await UserModel.create({
              username : username,
              password : hashedPassword,
              salt : salt
            });

            const user = sanitizeUser(createNewUser);
            return cb(null, user);
          })
        }else {

          crypto.pbkdf2(password, userExist.salt, 310000, 32, 'sha256', async function(err, hashedPassword) {
           
            if (err) return cb(err); 
  
            if (!crypto.timingSafeEqual(userExist.password, hashedPassword)) {
              return cb(null, false, { message: 'Incorrect username or password.' });
            }

            const user = sanitizeUser(userExist);
            return cb(null, user);
          });
        }

    } catch (error) {
        return cb(error); 
    }
});


module.exports = PassportLocalStrategy;