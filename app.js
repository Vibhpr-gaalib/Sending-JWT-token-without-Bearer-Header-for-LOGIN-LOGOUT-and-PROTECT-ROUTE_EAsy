/* I just want to tell you t=i got frustrated when i want to send the autherization header and req.headers[]
returns undefined so i just create my ow  way to login and authenticate the user by using some global variables 
in my script ... PLEASE LET ME KNOW THE DRAWBACKS OF MY CODE...... so that i can improve my self */
require("dotenv").config();
var express = require('express');
var parser = require('body-parser');
var mongoose = require('mongoose');
var multer = require('multer');
var path = require("path");
const userupload = require('./upload_schema');

var app = express();
var jwt = require("jsonwebtoken");
mongoose.set('useCreateIndex', true);
mongoose.connect('mongodb://localhost/imageupload_test', {useNewUrlParser: true, useUnifiedTopology: true},()=>{
    console.log("connected with the data")
});

var PORT = process.env.PORT || 4000;
app.use(express.json());
app.use(parser.urlencoded({extended:false}));
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, authorization, Content-Type, Accept");
    next();
  })
  var token; //global token variable
  var logout_user; /*am thinking about using this variable which holds the value of user email and password so that
                   i can do the action which is explain the comment box*/
app.get('/posts',auth,(req,res)=>{

     res.send("User you are authenticated")
     
});

app.post('/logout',(req,res)=>{
        token=undefined;   //making the simple logouts
        userupload.findOne() /*you can also delete the token from the data_base and make it more secure by just 
                             verify the token store in the database */
        res.send('You are logout');
        
});

app.post('/login',async (req,res)=>{
   try{
    const user = {Email : "Krityamkarma8580412gmail.com",
                   Password : "445454"
                };    //here am just sending the custom email and password so that i can compare them with the database value
       userupload.findOne(user , (err,founded)=>{
        if(err) return res.status(404).send("Not Authenticated");
        if(founded) { 
            token = jwt.sign({user}, process.env.ACCESS_TOKEN); //assigning token-value to the token variable
            founded.Token.push(token);  // adding that token value to the database 
            founded.save(); // saving the value 
            res.send(token); //sending token 
       }else
       {res.send("User is not avalable")}  //error handling 
       });
    
    

   }
    catch(e) {return e}


});

function auth (req,res,next){ 
        console.log(token); //pring the value of the token in console
     if( token !== undefined){ //checking if the token is undefined or not 
        jwt.verify(token ,process.env.ACCESS_TOKEN,(err,verifed)=>{
            if(err) return res.status(404).send("Not Authenticated");
            req.user = verifed; 
            next();
        })
     }else{
            return res.status(404).send("Needs to login first")
     }
      }

app.listen(PORT,()=>{
    console.log("server has started");
});

/* so just tell what are the drawbacks if i use the above code... am new to node js and this is my own way
 to login the user , protect the routes and logout the user */