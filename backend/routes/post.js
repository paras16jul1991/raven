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
        cb(null, name + '-' +  Date.now()+ '.'+ MIME_TYPE [file.mimetype] );
    }
});

router.post("", multer({ storage : storage}).single('image'),(req,res,next)=>{
    const url = req.protocol + "://"+req.get('host');
    const post =  new Post( {title : req.body.title
        , content : req.body.content
        , imagepath : url+'/images/' + req.file.filename
    });
    console.log(post);
    post.save().then((result)=>{
        console.log(result);
        res.status(201).json({message:"Post created successfully", post :{
            id : result._id,
            title : result.title,
            content : result.content,
            imagepath : result.imagepath 
        } }); 
    });
});


router.get("",(req,res,next)=>{

    const pagesize = +req.query.pagesize;
    const currentpage = +req.query.page;
    const postquery = Post.find();

    console.log( 'pagesize' + pagesize + "   currentpage  "+ currentpage );
    if(pagesize && currentpage){
        postquery.skip(pagesize * (currentpage - 1)).limit(pagesize);
    }

    let fetchedPosts;
    postquery.then((documents)=>{
        fetchedPosts = documents;
        return Post.count();
    }).then((count)=>{
        res.status(200).json({
            'message' : 'Posts fetched successfully',
             'posts' : fetchedPosts,
             'maxposts' : count
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

router.put('/:id', multer({ storage : storage}).single('image'), (req , res, next) => {
    let imagepath = req.body.imagepath;
    if(req.file){
        const url = req.protocol + "://"+req.get('host');
        imagepath = url+'/images/' + req.file.filename;
    }
    const post  = { _id : req.body.id ,title : req.body.title , content : req.body.content , imagepath : imagepath};
    console.log('edit id : ',req.params.id);
    Post.updateOne( { _id : req.params.id}, post ).then( result => {
            console.log(" Update Result "+ result);    
            res.status(200).json( { message : 'Post updated' } );
        });
} );

module.exports = router;