const express = require("express");
const app = express();
const mongoose = require("mongoose");
let signInUitility = require("./utility/login-utility")
let router = express.Router();
const User = require("../model/User");
const userRoute = require("../routes/Users");
require('dotenv').config()


// Got the below connection string from MongoDB atlas
// TO DO: Move below to config file
const mongoDB = "mongodb://mongo:27017/notes";
mongoose.connect(mongoDB, { useNewUrlParser: true , useUnifiedTopology: true}); // extraParams
const db = mongoose.connection;


db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.on('connected', ()=>{
    console.log('MongoDB connected');
  });

// Route User APIs to userRoute
router.use("/", userRoute);

router.post("/login",(req,res)=>{
    let token = signInUitility.signIn(req,res);
    if(!token){
        res.sendStatus(401);
    }
    else{
      //  console.log(token)
        res.cookie("token", token, { maxAge: 300000 * 1000 })
        res.send(token)
    }
});
router.get("/menu",signInUitility.verifyToken,(req,res)=>{
   
    res.send({
        "j":"k"
    })
});

module.exports = router;