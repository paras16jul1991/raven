const express = require('express');
const multer = require('multer');
const router = express.Router();

const Post = require('../models/post');
const MIME_TYPE = {
    'image/png' : 'png',
    'image/jpeg' : 'jpg',
    'image/jpg' : 'jpg'
} 

const storage = multer.diskStorage( {

    destination  : (req, file ,cb )=>{
        const isvalid = MIME_TYPE[file.mimetype];
        let error = new Error("invalid mime type");
        if(isvalid){
            error = null;
        }
        cb(error,"backend/images");
    },
    filename : (req, file ,cb ) => { 
        const name = file.originalname.toLowerCase().split(' ').join('-');
        cb(null, name + '-' +  Date.now()+ MIME_TYPE [file.mimetype] );
    }
});

router.post("", multer({ storage : storage}).single('image'),(req,res,next)=>{
    const post =  new Post( {title : req.body.title, content : req.body.content});
    console.log(post);
    post.save().then((result)=>{
        console.log(result);
        res.status(201).json({message:"Post created successfully", postid : result._id}); 
    });
});


router.get("",(req,res,next)=>{
    console.log("Inside second middleware");
    Post.find().then((documents)=>{
        res.status(200).json({
            'message' : 'Posts fetched successfully',
             'posts' : documents
        });
    }).catch(()=>{
        console.log("No record found from Mongo");
        res.status(200).json({
            'message' : 'Posts fetched successfully',
             'posts' : [] 
        });
    });

     
});


router.get("/:id",(req,res,next )=>{
    Post.findById(req.params.id).then((post)=>{
        if(post){
            res.status(200).json(post);
        }else{
            res.status(404).json({
                'message' : 'Posts not found !'
            });
        }
        
    });
});

router.delete('/:id', (req , res, next) => {
    console.log('deleting  id : ',req.params.id);
    Post.deleteOne( { _id : req.params.id } ).then( result => {
            console.log("Delete Result "+ result);    
            res.status(200).json( { message : 'Post deleted' } );
        });
} );

router.put('/:id', (req , res, next) => {

    const post  = { _id : req.body.id ,title : req.body.title , content : req.body.content };
    console.log('edit id : ',req.params.id);
    Post.updateOne( { _id : req.params.id}, post ).then( result => {
            console.log(" Update Result "+ result);    
            res.status(200).json( { message : 'Post updated' } );
        });
} );

module.exports = router;