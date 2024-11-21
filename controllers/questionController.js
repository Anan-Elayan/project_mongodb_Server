
const Question = require('../models/question');

const addQuestion = async (req, res) => {
    const { question, choices, correctAnswer } = req.body;
    if (!question || choices.length !== 4 || !correctAnswer || !choices.includes(correctAnswer)) {
        return res.status(400).json({ message: 'Invalid question or answer' });
    }
    try {
        const newQuestion = new Question({ question, choices, correctAnswer });
        await newQuestion.save();
        res.status(201).json({ message: 'Question added successfully', question: newQuestion });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err });
    }
};

const getQuestions = async (req, res) => {
    try {
        const questions = await Question.find();
        if (questions.length === 0) {
            return res.status(404).json({ message: 'No questions found' });
        }
        res.status(200).json(questions);
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err });
    }
};

module.exports = { addQuestion, getQuestions };
