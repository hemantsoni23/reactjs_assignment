const User = require('../models/Users');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const createAccessToken = (user) => {
    return jwt.sign(user, process.env.JWT_SECRET, { expiresIn: '2h' });
};

// User registration
const register = async (req, res) => {
    const { email, password } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({
            email,
            password: hashedPassword,
            role: 'User',
        });

        const accessToken = createAccessToken({ email, role: newUser.role });

        res.status(201).json({
            message: 'User registered successfully',
            role: newUser.role,
            accessToken: accessToken
        });
    } catch (error) {
        res.status(500).json({ error: `User already exists or server error ${error}` });
    }
};

// User login
const login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: 'Please provide email and password' });
    }

    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ error: 'User does not exist' });

        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) return res.status(400).json({ error: 'Incorrect password' });

        const accessToken = createAccessToken({ email: user.email, role: user.role, });
        
        res.status(201).json({
            message: 'User registered successfully',
            role: user.role,
            accessToken:accessToken});
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

module.exports = {
    register,
    login,
};
