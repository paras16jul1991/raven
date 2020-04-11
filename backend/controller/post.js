
const Post = require('../models/post');
const checkAuth = require('../middleware/check-auth');
const MIME_TYPE = {
    'image/png' : 'png',
    'image/jpeg' : 'jpg',
    'image/jpg' : 'jpg'
} 


exports.postPut = (req , res, next) => {
    let imagepath = req.body.imagepath;
    if(req.file){
        const url = req.protocol + "://"+req.get('host');
        imagepath = url+'/images/' + req.file.filename;
    }
    const post  = { _id : req.body.id ,title : req.body.title , content : req.body.content , imagepath : imagepath, creator : req.userData.userid};
    console.log('edit id : ',req.params.id);
    Post.updateOne( { _id : req.params.id , creator : req.userData.userid }, post ).then( result => {
            if(result.n > 0){
                console.log(" Update Result "+ result);    
                return res.status(200).json( { message : 'Post updated' });
            }else{ 
                return res.status(401).json( { message : 'Your are not autherized to update content' });
            }
        }).catch(err =>{
            res.status(500).json({message : 'Something wrong happened'});
        });
    }

    exports.postDelete =  (req , res, next) => {
        console.log('deleting  id : ',req.params.id);
        Post.deleteOne( { _id : req.params.id ,  creator : req.userData.userid } ).then( result => {
            if(result.n > 0){
                console.log(" Update Result "+ result);    
                res.status(200).json( { message : 'Post deleted' } );
            }else{ 
                return res.status(401).json( { message : 'Your are not autherized to delete content' });
            } 
        }).catch(err =>{
            res.status(500).json({message : 'Something wrong happened'});
        });
    }

    exports.getById = (req,res,next )=>{
        Post.findById(req.params.id).then((post)=>{
            if(post){
                res.status(200).json(post);
            }else{
                res.status(404).json({
                    'message' : 'Posts not found !'
                });
            }
            
        }).catch(err =>{
            res.status(500).json({message : 'Something wrong happened'});
        });
    }

    exports.getPosts = (req,res,next)=>{

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
        }).catch(err =>{
            res.status(500).json({message : 'Something wrong happened'});
        });
    
         
    }
    
    exports.submitPost = (req,res,next)=>{
        console.log( req.userData);
    
        const url = req.protocol + "://"+req.get('host');
        const post =  new Post( {title : req.body.title
            , content : req.body.content
            , imagepath : url+'/images/' + req.file.filename
            , creator : req.userData.userid
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
        }).catch(err =>{
            res.status(500).json({message : 'Something wrong happened'});
        });
    };