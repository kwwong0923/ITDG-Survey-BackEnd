const Survey = require("../models/survey.server.model");
const Answer = require("../models/answer.server.model");

// GET - get one survey
module.exports.apiGetSurvey = async function(req, res)
{
    let { surveyId } = req.params;
    console.log(surveyId);
    try
    {
        let foundData = await Survey.findOne({surveyId});
        if (foundData)
        {
            console.log(`DATA FOUND: ${foundData}`);
            res.json(foundData);
        }
        else
        {
            console.log(`DATA NOT FOUND`)
        }                     
    }
    catch(error)
    {
        res.json(error);
    }
}
// GET - get all the surveys
module.exports.apiGetSurveys = async function(req, res)
{
    try
    {
        let foundSurveys = await Survey.find({});
        if (foundSurveys)
        {
            console.log("DATA FOUND!!!");
            console.log(foundSurveys);
            res.json(foundSurveys)
        }
        else
        {
            console.log("DATA UNFOUNDED");
        }
    }
    catch(error)
    {
        res.json(error);
        next(error)
    }
};

// POST - Create a new survey
module.exports.apiPostSurvey = async function(req, res)
{
    let{topic, description, questions, surveyId} = req.body;
    console.log(req.body);
    // console.log(surveyId, topic, description, active, answered, questions);
    try
    {
        let newSurvey = new Survey(
            {
                topic, description, questions, surveyId
            }
        );
        let data = await Survey.findOne({topic});
        if(data !== null)
        {
            console.log("ERROR - SURVEY TOPIC ID IS DUPLICATED");
            return res.status(500).send("ERROR - SURVEY TOPIC ID IS DUPLICATED");
        }
        else
        {
            newSurvey.save();
            console.log(`SUCCESSFUL CREATING SURVEY, NAME:${newSurvey}`);
            res.send(
                {
                    msg: `SUCCESSFUL CREATING SURVEY, NAME:${topic}`,
                    saveObject: newSurvey
                }
            );
        }
    }
    catch(error)
    {
        console.log("BACKEND CREATING SURVEY ERROR");
        console.log(error);
        return res.status(500).send(error);

    }   
};

// module.exports.apiPostSurvey = (req, res) =>
// {
//     console.log("apiPostSurvey");
// }

// DELETE - delete a survey
module.exports.apiDeleteSurvey = async function(req, res)
{
    let {surveyId} = req.params;
    try
    {
        let deletedSurvey = await Survey.findOneAndDelete({surveyId});
        if(deletedSurvey)
        {
            console.log("SUCCESSFUL DELETING SURVEY")
            return res.send(
                {
                    msg: `SUCCESSFUL DELETING SURVEY, ID:${surveyId}`,
                    deletedObject: deletedSurvey
                }
            )
            
        }
        else
        {
            console.log(`ERROR DELETING SURVEY, ID: ${surveyId}`);
            return res.status(500).send("ERROR - BACKEND DELETE SURVEY ERROR");
        }
    }
    catch(error)
    {
        console.log(error);
        return res.status(500).send(error);
    }
    
};

// PUT - edit certain survey
module.exports.apiPutSurvey = async (req, res) =>
{     
    let {surveyId} = req.params;
    let{ topic, description, active, answered, questions} = req.body;
    // console.log(topic, description, active, answered, questions);
    try
    {
        let checkData = await Survey.findOne({surveyId});
        if(checkData.answered)
        {
            console.log("ERROR - THE SURVEY HAS ANSWERED");
            return res.status(500).json(
                {
                    msg: "ERROR - THE SURVEY HAS ANSWERED",
                }
            )
        }
        else
        {
            let updatedData = await Survey.findOneAndUpdate(
                {surveyId},
                { topic, description, active, answered, questions, surveyId},
                {
                    new: true,
                    runValidators: true,
                    overwrite: true
                }
            );
            return res.send(
                {
                    msg: `SUCCESSFUL EDITING SURVEY, ID:${surveyId}`,
                    updatedObj: updatedData
                }
            );            
        }    
    }
    catch(error)
    {
        console.log(`ERROR UPDATING SURVEY, ID:${surveyId} `);
        console.log(error);
        return res.status(500).send(error);
    }
    
}

// GET - get all the answers by survey id
module.exports.apiGetAnswerBySurveyId = async function(req, res)
{
    let {surveyId} = req.params; 
    console.log("apiGetAnswerBySurveyId-------------------");
    console.log(surveyId);
    try
    {
        let foundAnswers = await Answer.find({surveyId: surveyId});
        if (foundAnswers)
        {
            console.log("DATA FOUND!");
            console.log(foundAnswers);
            res.json(foundAnswers);
        }
    }
    catch(error)
    {
        res.json(error);
        next(error)
    }
}

// GET - get all the answers by user id
module.exports.apiGetAnswerByUserId = async function(req, res)
{
    let {userId} = req.params; 
    try
    {
        let foundAnswers = await Answer.find({userId});
        if (foundAnswers)
        {
            console.log("DATA FOUND!");
            console.log(foundAnswers);
            res.json(foundAnswers);
        }
    }
    catch(error)
    {
        res.json(error);
        next(error)
    }
}

// POST - submit the answers
module.exports.apiPostAnswer = async (req, res, next) =>
{
    let { surveyId, answers} = req.body;
    try
    {
        newAnswer = new Answer(
            {
                surveyId, answers
            }
        );
        newAnswer.save();
        answered(surveyId);
        surveyCounter(surveyId);
        console.log(`SUCCESSFUL CREATING ANSWER`);
        res.send(
            {
                msg: `SUCCESSFUL CREATING ANSWER`,
                saveObject: newAnswer
            }
        );
        next();
    }
    catch(error)
    {
        res.json(error);
        next(error);
    }
}

function answered (surveyId)
{
    let updateAnswered = Survey.findOneAndUpdate({surveyId}, {$set: {"answered" : true}})
        .then((result) => 
        {
            console.log("Updated survey answered");
        })
        .catch((err) =>
        {
            console.log(err);
        })    
}

function surveyCounter(surveyId)
{
    let counter;
    let foundSurvey = Survey.findOne({surveyId})
        .then((result) =>
        {
            let counter = result.counter + 1;
            let updateCounter = Survey.findOneAndUpdate({surveyId}, {$set: {"counter": counter}})
            .then((result) =>
            {
                console.log(`counter: ${counter}`)
            })
        })
        .catch(err)
        {
            console.log(err);
        }
}