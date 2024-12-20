
const express = require('express');
const router = express.Router();
const { addQuestion, getQuestions, getQuestionCount,getQuestionsByTeacherId,deleteQuestionById,updateQuestion} = require('../controllers/questionController');

router.post('/add', addQuestion);
router.delete('/deleteQuestionById', deleteQuestionById);
router.post('/getQuestionsByTeacherId', getQuestionsByTeacherId);
router.post('/updateQuestion', updateQuestion);
router.get('/get', getQuestions);
router.post('/getQuestionCount', getQuestionCount);


module.exports = router;
