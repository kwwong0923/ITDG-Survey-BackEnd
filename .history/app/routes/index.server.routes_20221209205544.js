const express = require("express");
const router = express.Router();

const indexController = require("../controllers/index.server.controller");
const authCheck = require("../controllers/auth-check.controller")

router.get("/api/get-surveys", indexController.apiGetSurveys);

router.post("/api/post-survey",authCheck, indexController.apiPostSurvey );

router.delete("/api/delete-survey/:surveyId", authCheck, indexController.apiDeleteSurvey);

router.put("/api/edit-survey/:surveyId", authCheck, indexController.apiPutSurvey);

router.get("/api/get-answer/:surveyId", authCheck, indexController.apiGetAnswerBySurveyId);

router.get("/api/get-answers-userid/:userId", authCheck, indexController.apiGetAnswerByUserId);

router.post("/api/post-answer", indexController.apiPostAnswer);

router.get("/api/get-survey/:surveyId", indexController.apiGetSurvey);

module.exports = router;