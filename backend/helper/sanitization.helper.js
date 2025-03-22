exports.sanitizeUser = (user) => ({
  id: user._id,
  username: user.username,
});

exports.sanitizeGoogleJson = async (google) => {
  const guser = google._json;

  return {
    googleId: guser.sub,
    username: guser.email,
    name: guser.name,
    picture: guser.picture,
  };
};
