const { Schema, model } = require('mongoose');

const UserSchema = Schema({
    name : String,
    username : String,
    email : String,
    image : String,
    password : Buffer,
    salt : Buffer
},{ timestamps : true });

const UserModel =  model('User', UserSchema);

module.exports = UserModel;