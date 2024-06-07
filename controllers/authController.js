const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// Register Admin
exports.registerAdmin = async (req, res) => {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
        return res.status(400).json({ message: 'User already exists' });
    }

    const newUser = new User({
        name,
        email,
        password,
        role: 'admin',
    });

    const savedUser = await newUser.save();

    const token = savedUser.generateAuthToken();

    res.status(201).json({ user: savedUser, token });
};

// Register User
exports.register = async (req, res) => {
    const { name, email, password, role } = req.body;
    try {
        const userExists = await User.findOne({ email });
        if (userExists) return res.status(400).json({ message: 'User already exists' });

        const user = await User.create({ name, email, password, role });
        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(201).json({ token });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Login User
exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: 'Invalid credentials' });

        const isMatch = await user.matchPassword(password);
        if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(200).json({ token, role: user.role });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Logout User
exports.logout = (req, res) => {
    res.status(200).json({ message: 'Logged out successfully' });
};
