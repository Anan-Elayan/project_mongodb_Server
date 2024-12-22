
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(cors());  


const userRoutes = require('./routes/userRoutes');
const questionRoutes = require('./routes/questionRoutes');
const test_results = require('./routes/test_results');

require('./config/db');

app.use('/users', userRoutes);
app.use('/questions', questionRoutes);
app.use('/test_results', test_results);


const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
