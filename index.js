
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(cors());  


const userRoutes = require('./routes/userRoutes');
const questionRoutes = require('./routes/questionRoutes');

require('./config/db');

app.use('/users', userRoutes);
app.use('/questions', questionRoutes);


const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
