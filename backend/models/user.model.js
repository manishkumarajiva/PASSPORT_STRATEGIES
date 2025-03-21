const { Schema, model } = require('mongoose');

const UserSchema = Schema({
    name : String,
    username : String,
    picture : String,
    googleId : String,
    password : Buffer,
    salt : Buffer
},{ timestamps : true });

const UserModel =  model('User', UserSchema);

module.exports = UserModel;