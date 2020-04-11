const mongoose = require('mongoose')

const postschema  = mongoose.Schema({
                         title   : { type : String, require : true, default : 'Hello'},
                         content : { type : String, require : true, default : 'Hello'},
                         imagepath : { type : String, require : true, default : 'Hello'},
                         creator : { type : mongoose.Schema.Types.ObjectId , ref : 'User' , require : true}
                         
                     });

module.exports =  mongoose.model('Post' , postschema );                    