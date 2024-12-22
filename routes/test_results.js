
const express = require('express');
const router = express.Router();


const { addTestResult,getTestResultsByTeacherId } = require('../controllers/test_resultController');

router.post('/addTestResult',addTestResult );
router.post('/getTestResultsByTeacherId',getTestResultsByTeacherId );



module.exports = router;
