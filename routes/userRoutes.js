
const express = require('express');
const router = express.Router();
const { register, login, analytics, getUserId, getUserById,updateUserProfile,getTeachers } = require('../controllers/userController');

router.post('/register', register);
router.post('/login', login);
router.get('/analytics', analytics);
router.get('/getTeachers', getTeachers);
router.post('/getUserById', getUserById);
router.post('/getUserId', getUserId);
router.post('/updateUserProfile', updateUserProfile);


module.exports = router;
