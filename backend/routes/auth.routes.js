const { Router } = require('express');
const router = Router();
const passport = require('passport');

const { LocalSignIn, UserProfile, GoogleSignIn } = require('../controllers/auth.controller.js');

/** @Local Authentication */
router.post('/local-signin', passport.authenticate('local', { session : false }), LocalSignIn);

/** @Google Authentication */
router.get('/google-signin', passport.authenticate('google', { session : false }));
router.get('/google/callback', passport.authenticate('google', { session : false }), GoogleSignIn)


/**
 * @authorization Check using JWT
 */
router.get('/profile', passport.authenticate('jwt', { session : false }), UserProfile);







/**
 * @authorization Check using isAuthenticate()
 */
// router.get('/get',(req, res, done) => {
//     if(req.isAuthenticated()){
//         done()
//     }else{
//         console.log('Un Authorize :)')
//     }    
// }, GetUser);




module.exports = router;