
const express = require('express');
const router = express.Router();
const { register, login, analytics } = require('../controllers/userController');

router.post('/register', register);
router.post('/login', login);
router.get('/analytics', analytics);

module.exports = router;
