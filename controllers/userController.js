
const User = require('../models/user');
const bcrypt = require('bcrypt');

const register = async (req, res) => {
    const { name, email, password, registerAs } = req.body;
    if (!name || !email || !password || !registerAs) {
        return res.status(400).json({ message: 'All fields are required' });
    }
    try {
        const newUser = new User({ name, email, password, registerAs });
        await newUser.save();
        res.status(201).json({ message: 'User created successfully', user: newUser });
    } catch (err) {
        if (err.code === 11000) {
            return res.status(400).json({ message: `The email ${err.keyValue.email} is already in use.` });
        }
        res.status(500).json({ message: 'Server error', error: err });
    }
};


const login = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
    }
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }
        res.status(200).json({ message: 'Login successful', user });
    } catch (err) {
        console.error("Error during login:", err);
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

const analytics = async (req, res) => {
    try {
        const users = await User.find();
        const totalAdmins = users.filter(user => user.registerAs === 'Admin').length;
        const totalUsers = users.filter(user => user.registerAs === 'User').length;
        res.json({ totalAdmins, totalUsers });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err });
    }
};

module.exports = { register, login, analytics };
