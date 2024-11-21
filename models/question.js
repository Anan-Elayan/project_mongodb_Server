
const mongoose = require('mongoose');

function arrayLimit(val) {
    return val.length === 4;
}

const questionSchema = new mongoose.Schema({
    question: { type: String, required: true },
    choices: {
        type: [String],
        validate: [arrayLimit, 'Choices array must have exactly 4 items'],
        required: true
    },
    correctAnswer: { type: String, required: true }
});

const Question = mongoose.model('Question', questionSchema);
module.exports = Question;
