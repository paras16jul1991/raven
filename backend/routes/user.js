const express = require('express');
const multer = require('multer');
const bcryt = require('bcrypt');
const router = express.Router();

const User = require('../models/User');

router.post("/signup",(req,res,next)=>{

    bcryt.hash(req.body.password, 10 ).then( hash => {
        const user = new User(
            {
                email : req.body.email,
                passowrd : hash
            }
        );

        user.save().then(result => {
                res.status(201).json( {
                    message : "User created successfully",
                    result : result
                });
        }).catch(err=> {
            res.status(500).json({ error : err });
        });
    });
     
});

router.post("/login",(req,res,next)=>{
     
});

module.exports = router;
