const express = require('express');
const multer = require('multer');
const bcryt = require('bcrypt');
const jwt = require('jsonwebtoken');

const router = express.Router();

const User = require('../models/User');

router.post("/signup",(req,res,next)=>{

    bcryt.hash(req.body.password, 10 ).then( hash => {
        const user = new User(
            {
                email : req.body.email,
                password : hash
            }
        );

        user.save().then(result => {
                res.status(201).json( {
                    message : "User created successfully",
                    result : result
                });
        }).catch(err=> {
            res.status(500).json({ message : 'User already exist' });
        });
    });
     
});

router.post("/login",(req,res,next)=>{
    let fetchedUser;
    User.findOne({email : req.body.email }).then( user => {
        if(!user){
          return  res.status(500).json({message : 'User doesnt exist'});
        }
        else{
          fetchedUser = user;
          return bcryt.compare( req.body.password, user.password);
        }
    }).then(result => {
        console.log(result);
        if(!result){
         return   res.status(401).json({message : 'Authentication failed'});
        }
        else{
            const token = jwt.sign({email : fetchedUser.email , userid: fetchedUser._id},
                         'secret_this_should_be_longer',{expiresIn: "1h"});
            res.status(200).json({token : token, expiresIn : 3600, userid : fetchedUser._id});
        }
    }).catch(error =>{
        console.log(error);
        res.status(500).json({message : 'operation failed'});
    });

     
});

module.exports = router;
