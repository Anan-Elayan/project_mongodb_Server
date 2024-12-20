
const express = require('express');
const router = express.Router();
const { register, login, analytics, getUserId, getUserById,updateUserProfile,getTeachers,getStudentsByTeacherId } = require('../controllers/userController');

router.post('/register', register);
router.post('/login', login);
router.post('/analytics', analytics);
router.get('/getTeachers', getTeachers);
router.post('/getUserById', getUserById);
router.post('/getUserId', getUserId);
router.post('/getStudentsByTeacherId',getStudentsByTeacherId);
router.post('/updateUserProfile', updateUserProfile);


module.exports = router;
