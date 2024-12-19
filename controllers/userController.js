
const User = require('../models/user');
const bcrypt = require('bcrypt');

const register = async (req, res) => {
    const { name, email, password, role, teacher_id } = req.body;
    try {
        //check if user already exists
        const userExists = await User.findOne({ email });

        if (userExists) {
            return res.status(400).json({ message: "Your email already registered" });
        }

        if (role === "teacher") {
            const teacher = new User({ name, email, password, role });
            await teacher.save();
            res.status(201).json({ message: "User registered successfully!" });
        } else if (role === "student") {
            const user = new User({ name, email, password, role, teacher_id });
            await user.save();
            res.status(201).json({ message: "User registered successfully!" });
        } else {
            res.status(400).json({ message: "Invalid role" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
}

const getTeachers = async (req, res) => {
    try {
        const teachers = await User.find({ role: 'teacher' });
        res.status(200).json(teachers);
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err });
    }
}



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
        res.status(200).json({ user });
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
    const { teacher_id } = req.body; // Get the teacher ID from the request body

    if (!teacher_id) {
        return res.status(400).json({ message: 'Teacher ID is required' });
    }

    try {
        // Find students with the specified teacher_id
        const students = await User.find({ role: 'student', teacher_id });

        // Return the count of students
        res.json({ totalStudents: students.length });
    } catch (err) {
        console.error('Error fetching analytics:', err);
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};


module.exports = { register, login, analytics, getUserId, getUserById, updateUserProfile ,getTeachers};
