const express = require('express');
const session = require('express-session');
const path = require('path');
const authRoutes = require('./routes/authRoutes');
const profileRoutes = require('./routes/profileRoutes.js');
const dataRoutes = require('./routes/dataRoutes');

const app = express();
const port = 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Session configuration
app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        sameSite: 'lax',
        maxAge: 24 * 60 * 60 * 1000
    }
}));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/data', dataRoutes);

// Start server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});