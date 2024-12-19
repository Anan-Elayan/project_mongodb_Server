
const Question = require('../models/question');


const addQuestion = async (req, res) => {
    const { question, choices, correctAnswer, questionRat } = req.body;

    // Ensure the question and answer data is valid
    if (!question || choices.length !== 4 || !correctAnswer || !choices.includes(correctAnswer) || !questionRat) {
        return res.status(400).json({ message: 'Invalid question or answer' });
    }

    try {
        // Create a new question object with the provided data
        const newQuestion = new Question({ question, choices, correctAnswer, questionRat });

        // Save the new question to the database
        await newQuestion.save();

        // Respond with success message and the new question data
        res.status(201).json({ message: 'Question added successfully', question: newQuestion });
    } catch (err) {
        // Handle server errors
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


// Method to get the total count of questions
const getQuestionCount = async (req, res) => {
    try {
        // Use countDocuments() to get the number of documents in the Question collection
        const questionCount = await Question.countDocuments();
        res.status(200).json({ totalQuestions: questionCount });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err });
    }
};


module.exports = { addQuestion, getQuestions, getQuestionCount };
