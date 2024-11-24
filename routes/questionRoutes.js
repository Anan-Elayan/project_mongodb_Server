
const express = require('express');
const router = express.Router();
const { addQuestion, getQuestions, getQuestionCount } = require('../controllers/questionController');

router.post('/add', addQuestion);
router.get('/get', getQuestions);
router.get('/getQuestionCount', getQuestionCount);


module.exports = router;
