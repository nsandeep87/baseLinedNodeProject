let express = require("express");
let validateUser = require("./authMiddleWare")
let router = express.Router();

router.get("/login",validateUser,(req,res)=>{
    console.log(req)
    res.send({
        "j":"k"
    })
})
router.get("/login/:id",(req,res)=>{
    //console.log(req.params.id)
    res.send({
        "j":"k"
    })
})
module.exports = router;