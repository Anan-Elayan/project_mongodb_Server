
const express = require('express');
const router = express.Router();
const { register, login, analytics, getUserId, getUserById,updateUserProfile } = require('../controllers/userController');

router.post('/register', register);
router.post('/login', login);
router.get('/analytics', analytics);
router.post('/getUserById', getUserById);
router.post('/getUserId', getUserId);
router.post('/updateUserProfile', updateUserProfile);


module.exports = router;
