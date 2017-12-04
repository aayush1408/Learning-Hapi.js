const mongoose = require('mongoose');
const connect = mongoose.connect('mongodb://localhost/hapidb');
const db = mongoose.connection;
var UserSchema = new mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true}
});
module.exports = mongoose.model('User',UserSchema); 
