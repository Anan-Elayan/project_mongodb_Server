
const express = require('express');
const router = express.Router();


const { addTestResult } = require('../controllers/test_resultController');

router.post('/addTestResult',addTestResult );



module.exports = router;
