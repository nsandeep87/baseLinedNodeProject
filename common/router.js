let express = require("express");
let validateUser = require("./authMiddleWare")
let signInUitility = require("./utility/login-utility")
let router = express.Router();
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
router.get("/menu",validateUser,(req,res)=>{
   
    res.send({
        "j":"k"
    })
})
module.exports = router;