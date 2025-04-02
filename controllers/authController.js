const bcrypt = require('bcryptjs');
let users = [];

exports.registerUser = async (req, res) => {
    try {
        const { username, password } = req.body;
        if (users.some(u => u.username === username)) {
            return res.status(400).json({ error: 'User already exists' });
        }
        
        const hashedPassword = await bcrypt.hash(password, 10);
        users.push({ username, password: hashedPassword });
        res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Registration failed' });
    }
};

exports.loginUser = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = users.find(u => u.username === username);
        
        if (!user || !await bcrypt.compare(password, user.password)) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }
        
        req.session.user = { username };
        res.json({ message: 'Login successful', username });
    } catch (error) {
        res.status(500).json({ error: 'Login failed' });
    }
};

exports.logoutUser = (req, res) => {
    req.session.destroy((err) => {
        if (err) return res.status(500).json({ error: 'Logout failed' });
        res.clearCookie('connect.sid');
        res.json({ message: 'Logged out successfully' });
    });
};