const LocalStrategy = require('passport-local');
const UserModel = require('../models/user.model.js');
const crypto = require('crypto');
const sanitizeUser = require('../helper/sanitizeUser.helper.js');


const PassportLocalStrategy = new LocalStrategy(async function verify(username, password, cb) {
    try {
        const USER = await UserModel.findOne({ username : username });
        if (!USER) { return cb(null, false, { message: 'Incorrect username or password.' }); }
                
        crypto.pbkdf2(password, USER.salt, 310000, 32, 'sha256', function(err, hashedPassword) {
          if (err) { return cb(err); }
  
          if (!crypto.timingSafeEqual(USER.password, hashedPassword)) {
            return cb(null, false, { message: 'Incorrect username or password.' });
          }
          
          const user = sanitizeUser(USER);
          return cb(null, user);
        });
    } catch (error) {
            return cb(error); 
    }
});


module.exports = PassportLocalStrategy;