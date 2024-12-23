
const express = require('express');
const router = express.Router();
const { addQuestion, getQuestions, getQuestionCount,getQuestionsByTeacherId,deleteQuestionById,updateQuestion,getQuestionsById,closeQuiz} = require('../controllers/questionController');

router.post('/add', addQuestion);
router.delete('/deleteQuestionById', deleteQuestionById);
router.post('/getQuestionsByTeacherId', getQuestionsByTeacherId);
router.post('/updateQuestion', updateQuestion);
router.post('/getQuestions', getQuestions);
router.post('/getQuestionCount', getQuestionCount);
router.post('/getQuestionsById', getQuestionsById);
router.post('/closeQuiz', closeQuiz);


module.exports = router;
