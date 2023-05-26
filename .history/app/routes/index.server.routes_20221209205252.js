const express = require("express");
const router = express.Router();

const indexController = require("../controllers/index.server.controller");
const authController = require("../controllers/auth.server.controller");

router.get("/api/get-surveys", indexController.apiGetSurveys);

router.post("/api/post-survey", indexController.apiPostSurvey );

router.delete("/api/delete-survey/:surveyId",, indexController.apiDeleteSurvey);

router.put("/api/edit-survey/:surveyId",authController.authCheck(), indexController.apiPutSurvey);

router.get("/api/get-answer/:surveyId",authController.authCheck(), indexController.apiGetAnswerBySurveyId);

router.get("/api/get-answers-userid/:userId",authController.authCheck(), indexController.apiGetAnswerByUserId);

router.post("/api/post-answer", indexController.apiPostAnswer);

router.get("/api/get-survey/:surveyId", indexController.apiGetSurvey);

module.exports = router;