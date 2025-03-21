const { Router } = require('express');
const router = Router();
const passport = require('passport');

const { SignUp, SignIn, GetUser, UserProfile } = require('../controllers/auth.controller.js');

router.post('/signup', SignUp);
router.post('/signin', passport.authenticate('local', { session : false }), SignIn);

// Two way for authorization

/**
 * @authorization Check using isAuthenticate()
 */
router.get('/get',(req, res, done) => {
    if(req.isAuthenticated()){
        done()
    }else{
        console.log('Un Authorize :)')
    }
}, GetUser);


/**
 * @Authorization check using Json Web Token
 */

router.get('/profile', passport.authenticate('jwt', { session : false }), UserProfile);




/** @Google Authentication */
router.get('/google/login', passport.authenticate('google', { session : false }));
router.get('/google/callback', passport.authenticate('google', { session : false }), SignIn)


module.exports = router;