const jwt = require("jsonwebtoken");
module.exports.authCheck = (req, res, next) =>
{
    try
    {
        const token = req.headers.authorization.split(" ")[1];
        const decodedToken = jwt.verify(token, "JWT_SECRET");
        req.userData = { username: decodedToken.username, userId: decodedToken._id}
        next();
    }
    catch(err)
    {
        
    }
};