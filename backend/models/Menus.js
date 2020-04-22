const mongoose = require('mongoose')
//const validator = require('mongoose-unique-validator')

const menusschema  = mongoose.Schema({
                         name   : { type : String, require : true, unique : true},
                         link : { type : String, require : true }
                     });

//userschema.validator(validator);                     

module.exports =  mongoose.model('Menus' , menusschema );                    