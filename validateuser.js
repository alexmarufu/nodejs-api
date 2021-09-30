
const requireLogin = (req, res, next) => {

    const userId = req.body.userId;
    const apikey = req.body.apikey;

    if (!userId && !apikey) {
       return res.status(400).json({ message: "userId and apikey required" });
    } else if(userId && apikey) {
         req.user = { userId, apikey };
    } else {
        return res.status(400).json({ message: "invalid userId or apikey " });
    }
    next();
    
  };

  module.exports = requireLogin
