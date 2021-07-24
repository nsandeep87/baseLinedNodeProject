const express = require("express");
const User = require("../model/User");
let signInUtility = require("../common/utility/login-utility");
let userRoute = express.Router();

// Get all Users
userRoute.get("/users", signInUtility.verifyToken, async (req,res)=>{
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
userRoute.get("/users/:userId", signInUtility.verifyToken, async (req,res)=>{
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
userRoute.post("/users", signInUtility.verifyToken, async (req,res)=>{
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
userRoute.put("/users/:userId", signInUtility.verifyToken, async (req,res)=>{
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
userRoute.delete("/users/:userId", signInUtility.verifyToken, async (req,res)=>{
    try{
        const deletedUser = await User.remove({_id: req.params.userId});
        res.json(deletedUser);
    }
    catch(err){
        console.log(err);
        res.json({message: err});
    }
});

module.exports = userRoute;