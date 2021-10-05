const jwt = require("jsonwebtoken");

const requireLogin = (req, res, next) => {

    const userToken = req.body.userToken;
    const apiKey = req.body.apiKey;
    if (!userToken && !apiKey) {
       return res.status(400).json({ message: "userToken and apiKey are required" });
    } else if(userToken && apiKey) {
        const user = jwt.verify(userToken, "challengesecret", /*{expiresIn: "1d"}*/);
        req.user = user;
        console.log(user)
    } else {
        return res.status(400).json({ message: "invalid token or apiKey please get your apiKey at http//localhost:3000/ and signin at http//localhost:3000/signin or signup at http//localhost:3000/signin to get your userToken" });
    }
    next();   
 };

  module.exports = requireLogin

    
  
  
  
