const mongoose = require('mongoose')
const validator = require('mongoose-unique-validator')

const userschema  = mongoose.Schema({
                         email   : { type : String, require : true, unique : true},
                         password : { type : String, require : true }
                     });

//userschema.validator(validator);                     

module.exports =  mongoose.model('User' , userschema );                    