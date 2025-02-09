
const Question = require('../models/question');


const addQuestion = async (req, res) => {
    const { question, choices, correctAnswer, questionRat, teacherId } = req.body;

    // Ensure the question and answer data is valid
    if (!question || !teacherId || choices.length !== 4 || !correctAnswer || !choices.includes(correctAnswer) || !questionRat) {
        return res.status(400).json({ message: 'Invalid question or answer' });
    }

    try {
        // Create a new question object with the provided data
        const newQuestion = new Question({ question, choices, correctAnswer, questionRat, teacherId });

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
        const { teacherId } = req.body;
        if (!teacherId) {
            return res.status(400).json({ message: 'Teacher ID is required' });
        }
        const questions = await Question.find({ teacherId });
        if (questions.length === 0) {
            return res.status(404).json({ message: `No questions found for teacher ID: ${teacherId}` });
        }
        const groupedQuestions = {
            teacherId,
            questions,
        };
        res.status(200).json(groupedQuestions);
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};


const getQuestionCount = async (req, res) => {
    const { teacherId } = req.body;

    // Validate that teacherId is provided
    if (!teacherId) {
        return res.status(400).json({ message: 'Teacher ID is required' });
    }

    try {
        // Use countDocuments() to count questions specific to the teacher
        const questionCount = await Question.countDocuments({ teacherId });

        res.status(200).json({ totalQuestions: questionCount });
    } catch (err) {
        // Handle server error
        res.status(500).json({ message: 'Server error', error: err });
    }
};


// Method to get questions based on teacherId
// Method to get questions based on teacherId with sorting
const getQuestionsByTeacherId = async (req, res) => {
    const { teacherId, sortOrder } = req.body;

    // Ensure teacherId is provided
    if (!teacherId) {
        return res.status(400).json({ message: 'Teacher ID is required' });
    }

    // Set default sorting to ascending (1) if no sortOrder is provided
    const order = sortOrder === 'desc' ? -1 : 1;

    try {
        // Find all questions with the provided teacherId and sort by questionRat
        const questions = await Question.find({ teacherId }).sort({ questionRat: order });

        if (questions.length === 0) {
            return res.status(404).json({ message: 'No questions found for the provided teacher ID' });
        }

        res.status(200).json(questions);
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err });
    }
};


const deleteQuestionById = async (req, res) => {
    const { questionId } = req.body;

    // Ensure the questionId is provided
    if (!questionId) {
        return res.status(400).json({ message: 'Question ID is required' });
    }

    try {
        // Attempt to delete the question with the provided ID
        const deletedQuestion = await Question.findByIdAndDelete(questionId);

        if (!deletedQuestion) {
            return res.status(404).json({ message: 'Question not found' });
        }

        res.status(200).json({ message: 'Question deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err });
    }
};


// Method to update a question by ID
const updateQuestion = async (req, res) => {
    const { questionId, question, choices, correctAnswer, questionRat } = req.body;

    // Validate the input
    if (!questionId || !question || !choices || choices.length !== 4 || !correctAnswer || !choices.includes(correctAnswer) || !questionRat) {
        return res.status(400).json({ message: 'Invalid question or answer data' });
    }

    try {
        // Find the question by ID and update it
        const updatedQuestion = await Question.findByIdAndUpdate(
            questionId,
            { question, choices, correctAnswer, questionRat },
            { new: true }
        );

        if (!updatedQuestion) {
            return res.status(404).json({ message: 'Question not found' });
        }

        // Return success message and the updated question data
        res.status(200).json({ message: 'Question updated successfully', question: updatedQuestion });
    } catch (err) {
        // Handle server errors
        res.status(500).json({ message: 'Server error', error: err });
    }
};



const getQuestionsById = async (req, res) => {
    const { questionId } = req.body;

    // Ensure questionId is provided
    if (!questionId) {
        return res.status(400).json({ message: 'Question ID is required' });
    }

    try {
        // Convert the questionId to a MongoDB ObjectId
        const question = await Question.findOne({ _id: questionId });

        if (!question) {
            return res.status(404).json({ message: 'No question found with that ID' });
        }

        res.status(200).json(question);
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err });
    }
};


const closeQuiz = async (req, res) => {
    const { teacherId } = req.body;
    if (!teacherId) {
        return res.status(400).json({ message: 'Teacher ID is required' });
    }
    try {
        const questions = await Question.find({ teacherId });

        if (questions.length === 0) {
            return res.status(404).json({ message: 'No questions found for the provided teacher ID' });
        }
        const allCloseQuizFalse = questions.every((q) => q.closeQuiz === false);
        await Question.updateMany(
            { teacherId },
            { $set: { closeQuiz: allCloseQuizFalse } }
        );

        const updatedQuestions = await Question.find({ teacherId });

        res.status(200).json({
            message: `Questions updated successfully. All closeQuiz fields are now set to ${allCloseQuizFalse}`,
            updatedQuestions,
        });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err });
    }
};



module.exports = { addQuestion, getQuestions, getQuestionCount, getQuestionsByTeacherId, deleteQuestionById, updateQuestion, getQuestionsById, closeQuiz };
