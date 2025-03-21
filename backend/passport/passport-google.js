const GoogleStrategy = require('passport-google-oauth20');

const PassportGoogleStrategy = new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CLIENT_REDIRECT,
    scope: [ 'profile' ]
  }, 
  function verify(issuer, profile, cb) {

    console.log(profile, 'profile')
    // db.get('SELECT * FROM federated_credentials WHERE provider = ? AND subject = ?', [
    //   issuer,
    //   profile.id
    // ], function(err, row) {
    //   if (err) { return cb(err); }
    //   if (!row) {
    //     db.run('INSERT INTO users (name) VALUES (?)', [
    //       profile.displayName
    //     ], function(err) {
    //       if (err) { return cb(err); }
          
    //       var id = this.lastID;
    //       db.run('INSERT INTO federated_credentials (user_id, provider, subject) VALUES (?, ?, ?)', [
    //         id,
    //         issuer,
    //         profile.id
    //       ], function(err) {
    //         if (err) { return cb(err); }
    //         var user = {
    //           id: id,
    //           name: profile.displayName
    //         };
    //         return cb(null, user);
    //       });
    //     });
    //   } else {
    //     db.get('SELECT * FROM users WHERE id = ?', [ row.user_id ], function(err, row) {
    //       if (err) { return cb(err); }
    //       if (!row) { return cb(null, false); }
    //       return cb(null, row);
    //     });
    //   }
    // });
  });


  module.exports = PassportGoogleStrategy;