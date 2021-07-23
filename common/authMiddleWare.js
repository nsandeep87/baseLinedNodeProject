const jwt = require("jsonwebtoken");
const jwtKey = "SecretKey";
module.exports = function verifyToken(req, res, next) {
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
  