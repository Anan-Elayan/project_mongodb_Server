
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:24024/quizz_app', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));
