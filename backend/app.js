const express = require('express');
const bodyparser = require('body-parser');
const app = express();

app.use(bodyparser.json());

app.use((req,res,next)=>{
    console.log("Inside first middleware");
    res.setHeader("Access-Control-Allow-Origin","*");
    res.setHeader("Access-Control-Allow-MethodS","GET, POST , DELETE, PUT , OPTIONS, PATCH");
    res.setHeader("Access-Control-Allow-Headers","Origin,Content-Type,Accept,X-Requested-With");
    next();
});


app.post("/api/posts",(req,res,next)=>{
    const post =  req.body;
    console.log(post);
    res.status(201).json({message:"Post created successfully"});    
});


app.get("/api/posts",(req,res,next)=>{
    console.log("Inside second middleware");
    posts = [{
        'title' : 'Title 1 ',
        'content' : 'content 1',
        'id' : 'afsasdfasdf'
    },
    {
        'title' : 'Title 2 ',
        'content' : 'content 2',
        'id' : 'af12342134sasdfasdfsafasdf'
    }]; 

     res.status(200).json({
         'message' : 'Posts fetched successfully',
          'posts' : posts 
     });
});

module.exports = app;