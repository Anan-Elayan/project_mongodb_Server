const mongoose = require('mongoose');

const testResultSchema = new mongoose.Schema({
    studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to 'users' collection
    teacherId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to 'users' collection
    questions: [
        {
            questionId: { type: mongoose.Schema.Types.ObjectId, ref: 'Question', required: true }, // Reference to 'questions' collection
            answer: { type: String, required: true }, // Student's answer
            isCorrect: { type: Boolean, required: true },// Whether the answer was correct
            rating: { type: Number, required: true } 
        }
    ],
    totalScore: { type: Number, required: true }, // Total score of the test

});

// Create the model
const TestResult = mongoose.model('TestResult', testResultSchema, 'test_results');

module.exports = TestResult;
