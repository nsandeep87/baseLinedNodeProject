const jwt = require("jsonwebtoken");
const mockUsers = require("../dumpFiles/users")
const jwtKey = "SecretKey";
const jwtEopiry = '5h'; //"expiresIn" can be a number of seconds or string that repesents a timespan eg: "1d", "20h"

 function signIn (req,res,next){
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
           expiresIn: jwtEopiry
        })
        return token
       // res.cookie("token", token, { maxAge: jwtEopiry * 1000 })
       // res.send("Login Successful")
    }
    function verifyToken(req, res, next) {
        // console.log(req.headers)
         const bearerHeader = req.headers['authorization'];
       console.log(bearerHeader)
         if (bearerHeader) {
           const bearer = bearerHeader.split(' ');
           const bearerToken = bearer[1];
           console.log(bearerToken)
         try{
           let payload = jwt.verify(bearerToken,jwtKey)
           console.log(payload.exp)
           next();
         }
         catch(e){
           console.log(e.message)
           res.sendStatus(403);
         }
           
         } else {
           // Forbidden
           res.sendStatus(403);
         }
       }
 module.exports={
    signIn,
    verifyToken
 }
 

  
 
 