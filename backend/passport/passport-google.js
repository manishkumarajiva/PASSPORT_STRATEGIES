const GoogleStrategy = require("passport-google-oauth20");
const UserModel = require("../models/user.model.js");
const { sanitizeGoogleJson } = require("../helper/sanitization.helper.js");

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

      const userExist = await UserModel.findOne({
        $and: [{ googleId: data.googleId }, { username: data.username }],
      });

      if (userExist) {
        return done(null, userExist);
      } else {
        const createUser = await UserModel.create({
          name: data.name,
          picture: data.picture,
          googleId: data.googleId,
          username: data.username,
        });

        if (!createUser) return done(null, false);

        return done(null, createUser);
      }
    } catch (error) {
      return done(error);
    }
  }
);

module.exports = PassportGoogleStrategy;
