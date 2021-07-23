const jwt = require("jsonwebtoken");
const mockUsers = require("../dumpFiles/users")
const jwtKey = "SecretKey";
 const jwtEopiry = "300000"

 let signInUtility={
     "signIn": function (req,res,next){
        console.log("hi")
    const username = req.body.username;
    const password = req.body.password
    console.log(mockUsers[username])
        if(!username || !password || !mockUsers[username] || mockUsers[username] != password){
               return false
        }
        let token = jwt.sign({
            "userName":username
        },jwtKey,{
           algorithm: "HS256",
           expiresIn: jwtEopiry,
        })
        return token
       // res.cookie("token", token, { maxAge: jwtEopiry * 1000 })
       // res.send("Login Successful")
    }
 }
 module.exports = signInUtility;

  
 
 