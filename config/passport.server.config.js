const passport = require("passport");
const User = require("../app/models/user.server.model");
const LocalStrategy = require("passport-local");
// const bcrypt = require("bcrypt");
const { validPassword } = require("./passwordAuth.server.config");

module.exports = (passport) =>
{
    // Local Strategy
    const verifyCallback = (username, password, done) =>
    {
        User.findOne({username: username})
            .then((user) =>
            {
                if(!user)
                {
                    return done(null, false);
                }

                const isValid = validPassword(password, user.hash, user.salt);

                if(isValid)
                {
                    return done(null, user);
                }
            })
            .catch((err) =>
            {
                done(err);
            })
    };

    const strategy = new LocalStrategy(verifyCallback);

    passport.use(strategy);
    
    passport.serializeUser((user, done) => {
        console.log("----------------------serializeUser--------------------");
        done(null, user.id)
    })

    passport.deserializeUser((userId, done) => {
        console.log("----------------------deserializeUser--------------------");

        User.findById(userId)
        .then((user) => {
            done(null, user)
        })
        .catch(err => done(err))
    })
    
    // passport.serializeUser((user, done) => 
    // {
    //     console.log("Serializing User...");
    //     done(null, user._id);
    //     // grab the mongoDB's id -> store to the session
    // });

    // passport.deserializeUser(async (_id, done) => 
    // {
    //     console.log("deserializing User...");
    //     let foundUser = await User.findOne({_id});
    //     done(null, foundUser); 
    //     // assign foundUser to req.user
    //     // -> req.isAuthenticated = true
    // });
};



// passport.use(new LocalStrategy(async(username, password, done) => 
//     {
//         let foundUser = await User.findOne({email: username});
//         if(foundUser)
//         {
//             let result = await bcrypt.compare(password, foundUser.password);
//             if(result)
//             {
//                 done(null, foundUser);
//             }
//             else
//             {
//                 done(null, false);
//             }
//         }
//         else
//         {
//             done(null, false);
//         }
//     }));
