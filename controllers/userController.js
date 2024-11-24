
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

const getUserId = async (req, res) => {
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
        res.status(200).json({ message: 'Login successful', userId: user._id });
    } catch (err) {
        console.error("Error during login:", err);
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

// Get user data by ID
const getUserById = async (req, res) => {
    const { id } = req.body;  
    if (!id) {
        return res.status(400).json({ message: 'User ID is required' });
    }
    try {
        const user = await User.findById(id);  
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({  user });  
    } catch (err) {
        console.error("Error getting user data by ID:", err);
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};


const updateUserProfile = async (req, res) => {
    const { id, name, email, password } = req.body;

    if (!id || !name || !email) {
        return res.status(400).json({ message: 'ID, name, and email are required' });
    }

    try {
        // Find user by ID
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Update name and email
        user.name = name;
        user.email = email;

        // If the password is provided, hash it and update it
        if (password) {
            const salt = await bcrypt.genSalt(10); // Generate salt for bcrypt
            user.password = await bcrypt.hash(password, salt); // Hash the password
        }

        // Save the updated user data
        await user.save();

        res.status(200).json({ message: 'User profile updated successfully', user });
    } catch (err) {
        console.error("Error updating user profile:", err);
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

module.exports = { register, login, analytics, getUserId ,getUserById,updateUserProfile};
