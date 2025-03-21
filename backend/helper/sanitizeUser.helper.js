module.exports = sanitizeUser = (user) => ({
  id: user._id,
  username: user.username,
});
