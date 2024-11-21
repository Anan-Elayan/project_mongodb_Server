
const express = require('express');
const router = express.Router();
const { addQuestion, getQuestions } = require('../controllers/questionController');

router.post('/add', addQuestion);
router.get('/get', getQuestions);

module.exports = router;
