exports.sanitizeUser = (user) => (user._id);


exports.sanitizeGoogleJson = async (google) => {
  const guser = google._json;

  return ({
    googleId : guser.sub,
    username : guser.email,
    name : guser.name,
    picture : guser.picture
  })
}