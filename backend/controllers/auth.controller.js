const UserModel = require('../models/user.model.js');
const asyncHandler = require('express-async-handler');
const crypto = require('crypto');
const AccessToken = require('../helper/authToken.helper.js');


const SignUp = asyncHandler( async(req, res) => {
    const { username, password } = req.body;
    
    const isExist = await UserModel.findOne({ username : username });

    const salt = crypto.randomBytes(16);

    crypto.pbkdf2(password, salt, 310000, 32, 'sha256', async (err, hashedPassword) => {
        if (err) { return next(err); }
        
        var createOrUpdate;

        if(!isExist){
            createOrUpdate = await UserModel.create({
                username : username,
                password : hashedPassword,
                salt : salt
            });
        }else{
            createOrUpdate = await UserModel.findOneAndUpdate(
                {username : username},
                { password : hashedPassword, salt : salt },
                { new : true }
            );
        }


        if(!createOrUpdate) return res.status(400).json({ status : 200, success : false, message : 'Failed to signup'});

        req.login(createOrUpdate, function(err) {
            if (err) return res.status(500).json({status : 500, success : false, message : 'Session Failed'});
            res.status(201).json({ status : 201, success : true, message : 'Successfully SignUp', data : createOrUpdate });
        });
    
    });
});



const SignIn = asyncHandler(async (req, res) => {
    const token = await AccessToken(req.user);

    req.login(req.user, (err) => {
        if (err) return res.status(500).json({status : 500, success : false, message : 'Session Failed'});
        res.status(200).json({status : 200, success : true, message : 'Successfully Login', data : req.user, token : token });
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



module.exports = { SignUp, SignIn, GetUser, UserProfile }


