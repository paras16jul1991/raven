const express = require('express');
const bodyparser = require('body-parser');
const mongoos = require('mongoose');
const path  = require('path');

const postRoutes  = require('./routes/post');

mongoos.connect("mongodb://raven:raven123@ds017514.mlab.com:17514/heroku_3n6jhnlx", { useNewUrlParser: true , useUnifiedTopology: true })
.then(()=>{ console.log('Connection established with Mongo DB')})
.catch((e)=>{
    console.log('Connection failed ');
});

const app = express();

app.use(bodyparser.json());

app.use("/",express.static(path.join(__dirname,"raven_ui")));

app.use((req,res,next)=>{
    console.log("Inside first middleware");
    res.setHeader("Access-Control-Allow-Origin","*");
    res.setHeader("Access-Control-Allow-MethodS","GET, POST , DELETE, PUT, OPTIONS, PATCH");
    res.setHeader("Access-Control-Allow-Headers","Origin,Content-Type,Accept,X-Requested-With");
    next();
});

app.use("/api/posts",postRoutes);

app.use( (req, res, next)=>{
    res.sendFile(path.join( __dirname,'raven_ui','index.html'));
});

module.exports = app;