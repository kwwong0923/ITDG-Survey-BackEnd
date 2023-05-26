const mongoose = require("mongoose");

// set up for MongoDB

module.exports = function()
{
    const db  = mongoose.connect(process.env.DB_CONNECT,
                    {
                        useNewUrlParser: true,
                        useUnifiedTopology: true,
                    })
                    .then(()=>
                    {
                        console.log("CONNECT TO MONGODB ATLAS");
                    })
                    .catch((e)=>
                    {
                        console.log("FAILED TO CONNECT TO MONGODB ATLAS");
                        console.log(e);
                    })
    return db;
}