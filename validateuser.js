
const requireLogin = (req, res, next) => {

    const userId = req.body.userId;

    if (!userId) {
       return res.status(400).json({ message: "Authorization required" });
    } else if(userId) {
         req.userId = userId;
    } else {
        return res.status(400).json({ message: "invalid user" });
    }
    next();
    
  };

  module.exports = requireLogin