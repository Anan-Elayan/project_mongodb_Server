const TestResult = require('../models/test_result');

const addTestResult = async (req, res) => {
    const { studentId, teacherId, questions } = req.body;

    // Validate input data
    if (!studentId || !teacherId || !questions || questions.length === 0) {
        return res.status(400).json({ message: 'Invalid input data' });
    }

    try {
        // Calculate the total score based on correct answers and their ratings
        const totalScore = questions.reduce((total, question) => {
            return question.isCorrect ? total + (question.rating || 0) : total;
        }, 0);

        // Create a new test result object
        const newTestResult = new TestResult({
            studentId,
            teacherId,
            questions,
            totalScore
        });

        // Save the test result to the database
        await newTestResult.save();

        // Respond with a success message and the new test result data
        res.status(201).json({ message: 'Test result added successfully', testResult: newTestResult });
    } catch (err) {
        // Handle server errors
        res.status(500).json({ message: 'Server error', error: err });
    }
};

module.exports = { addTestResult };
