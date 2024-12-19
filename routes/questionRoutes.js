
const express = require('express');
const router = express.Router();
const { addQuestion, getQuestions, getQuestionCount,getQuestionsByTeacherId,deleteQuestionById } = require('../controllers/questionController');

router.post('/add', addQuestion);
router.delete('/deleteQuestionById', deleteQuestionById);
router.post('/getQuestionsByTeacherId', getQuestionsByTeacherId);
router.get('/get', getQuestions);
router.post('/getQuestionCount', getQuestionCount);


module.exports = router;
