const UserModel = require('../models/user.model.js');
const asyncHandler = require('express-async-handler');
const crypto = require('crypto');
const AccessToken = require('../helper/authToken.helper.js');
const { sanitizeUser } = require('../helper/sanitization.helper.js');


const SignIn = asyncHandler( async(req, res) => {
    
    const user = sanitizeUser(req.user);
    const token = await AccessToken(user);

    req.login(user, (err) => {
        if (err) return res.status(500).json({status : 500, success : false, message : 'Session Failed'});
        res.status(200).json({status : 200, success : true, message : 'Successfully Login', data : user, token : token });
    })
});




const GetUser = asyncHandler(async(req, res) => {
    const user = await UserModel.findById(req.user.id).select('-password -salt');
    if(!user) return res.status(200).json({ status : 400, status : false, message : 'User Not Found'});
    res.status(200).json({ status : 200, success : true, message : 'Successfully Fetch', data : user });
});


const UserProfile = asyncHandler(async(req, res) => {
    res.status(200).json({status : 200, success : true, data : req.user})
})



module.exports = { SignIn, GetUser, UserProfile }


