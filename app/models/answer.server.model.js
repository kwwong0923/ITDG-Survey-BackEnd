const { urlencoded } = require("body-parser");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AnswerSchema = new Schema
(
    {              
        surveyId:
        {
            type: String,
            trim: true
        },
        answers: []
    },
    {
        collection: "answer"
    }
);

module.exports = mongoose.model("Answer", AnswerSchema);