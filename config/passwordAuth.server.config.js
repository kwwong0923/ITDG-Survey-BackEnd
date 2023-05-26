const crypto = require("crypto");

module.exports.validPassword = (password, hash, salt) =>
{
    let hasVerify = crypto.pbkdf255Sync(password, salt, 1000, 64, "sha512").toString("hex");
    return hash === hasVerify;
};

module.exports.generatePassword = (password) =>
{
    let salt = crypto.randomBytes(32).toString("hex");
    let genHash = crypto.pbkdf2Sync(password, salt, 10000, 64, "sha512").toString("hex");

    return {
        salt: salt,
        hash: genHash
    }
};

module.exports.isLoggedIn = (req, res, next) =>
{
    if(req.isAuthenticated())
    {
        console.log(`email: ${req.session.passport.email}`);
        return next();
    }
    else
    {
        return res.status(400).json(
            {
                "statusCode": 400,
                "msg" : "Not Authenticated"
            })
    }
};