const UserModel = require('../models/user.model.js');
const asyncHandler = require('express-async-handler');
const AccessToken = require('../helper/authToken.helper.js');
const { sanitizeUser } = require('../helper/sanitization.helper.js');


const SignIn = asyncHandler( async(req, res) => {
    const user = sanitizeUser(req.user);
    const token = await AccessToken(user);

    res.redirect(`http://localhost:5173/success?token=${token}&id=${user.id}`);
});



const UserProfile = asyncHandler(async(req, res) => {
    const user = await UserModel.findById(req.user.id).select('-password -salt');
    if(!user) return res.status(200).json({ status : 400, status : false, message : 'User Not Found'});
    res.status(200).json({ status : 200, success : true, message : 'User Profile', data : user });
})



module.exports = { SignIn, UserProfile }


