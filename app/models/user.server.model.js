const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose");


const userSchema = new Schema(
    {
        username:
        {
            type: String,
            default: "",
            trim: true,
            required: "Username is required"
        },
        displayName:
        {
            type: String,
            required: true,
        },
        email: 
        {
            type: String,  
            required: true,
        },        
        created:
        {
            type: Date,
            default: Date.now
        },
        hash:
        {
            type: String,
        },
        salt:
        {
            type: String,
        }

    },
    {
        collection: "user"
    }
);

let option = ({missingPasswordError: "ERROR - Missing Password"});
userSchema.plugin(passportLocalMongoose, option);

module.exports = mongoose.model("User", userSchema);