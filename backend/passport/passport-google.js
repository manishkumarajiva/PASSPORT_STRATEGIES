const GoogleStrategy = require("passport-google-oauth20");
const UserModel = require("../models/user.model.js");
const { sanitizeGoogleJson, sanitizeUser } = require("../helper/sanitization.helper.js");

const PassportGoogleStrategy = new GoogleStrategy(
  {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CLIENT_REDIRECT,
    scope: ["profile", "email"],
  },
  async function verify(accessToken, refreshToken, profile, done) {
    try {
      const data = await sanitizeGoogleJson(profile);

      const userExist = await UserModel.findOne({ username: data.username });

      if(!userExist){
        const createUser = await UserModel.create(data)
        if(!createUser) return done(null, false, {message : 'failed to create'});
        return done(null, sanitizeUser(createUser));

      } else if(!userExist.googleId) {

        const updateUser = await UserModel.findOneAndUpdate(
          { username : userExist.username }, 
          {
            name: data.name,
            picture: data.picture,
            googleId: data.googleId,
            username: data.username,
          },
          { new : true }
        );

        if (!updateUser) return done(null, false);
        return done(null, sanitizeUser(updateUser));

      }else {
        return done(null, sanitizeUser(userExist))
      }
    } catch (error) {
      console.log('ERROR DURING GOOGLE - ', error)
      return done(error);
    }
  }
);

module.exports = PassportGoogleStrategy;
