let express = require("express");
const mongoose = require("mongoose");
let signInUitility = require("./utility/login-utility")
let router = express.Router();
const User = require("../model/User");


// Got the below connection string from MongoDB atlas
// TO DO: Move below to config file
const mongoDB = 'mongodb+srv://admin:admin@cluster0.pvurq.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
mongoose.connect(mongoDB, { useNewUrlParser: true , useUnifiedTopology: true}); // extraParams
const db = mongoose.connection;


db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.on('connected', ()=>{
    console.log('MongoDB connected');
  });

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

// Get all Users
router.get("/users", async (req,res)=>{
    try{
        console.log(req.body);
        const users = await User.find();
        res.send(users);
    }
    catch(err){
        console.log(err);
        res.json({message: err});
    }
});

// Get user by ID
router.get("/user/:userId", async (req,res)=>{
    try{
        console.log(req.params.userId);
        const user = await User.findById(req.params.userId).then(user => {
            if(!user) {
                return res.status(404).send({
                    message: "User not found with id " + req.params.userId
                });            
            }
            res.send(user);
        }).catch(err => {
            if(err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "User not found with id " + req.params.userId
                });                
            }
            return res.status(500).send({
                message: "Error retrieving user with id " + req.params.userId
            });
        });
        res.send(user);
    }
    catch(err){
        console.log(err);
        res.json({message: err});
    }
})

// Create user
router.post("/user", async (req,res)=>{
    try{
        console.log(req.body);
        const newUser = await User.create(req.body);
        res.sendStatus(200).json(newUser);
    }
    catch(err){
        console.log(err);
        res.json({message: err});
    }
});

// Update User by ID
router.put("/user/:userId", async (req,res)=>{
    try{
        const updatedUser = await User.updateOne(
            {_id: req.params.userId},
            {$set: {isActive: req.body.isActive}});
        res.json(updatedUser);
    }
    catch(err){
        console.log(err);
        res.json({message: err});
    }
});

// Delete User by ID
router.delete("/user/:userId", async (req,res)=>{
    try{
        const deletedUser = await User.remove({_id: req.params.userId});
        res.json(deletedUser);
    }
    catch(err){
        console.log(err);
        res.json({message: err});
    }
});

module.exports = router;