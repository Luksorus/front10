// Theme management
function applyTheme() {
    const theme = localStorage.getItem('theme') || 'light';
    document.body.className = theme;
}

function toggleTheme() {
    const newTheme = document.body.className === 'dark' ? 'light' : 'dark';
    localStorage.setItem('theme', newTheme);
    applyTheme();
}

// API handlers
async function handleRegister() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch('/api/auth/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        });
        
        const data = await response.json();
        if (!response.ok) throw new Error(data.error);
        showMessage('Registration successful!', 'success');
    } catch (error) {
        showMessage(error.message);
    }
}

async function handleLogin() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch('/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        });
        
        const data = await response.json();
        if (!response.ok) throw new Error(data.error);
        window.location.href = '/profile.html';
    } catch (error) {
        showMessage(error.message);
    }
}

async function handleLogout() {
    try {
        const response = await fetch('/api/auth/logout', { method: 'POST' });
        if (!response.ok) throw new Error('Logout failed');
        window.location.href = '/';
    } catch (error) {
        console.error(error);
    }
}

async function fetchData() {
    try {
        const response = await fetch('/api/data');
        if (!response.ok) throw new Error('Failed to fetch data');
        const data = await response.json();
        document.getElementById('data').textContent = data.data;
    } catch (error) {
        console.error(error);
    }
}

// Utility functions
function showMessage(message, type = 'error') {
    const messageEl = document.getElementById('message');
    messageEl.textContent = message;
    messageEl.style.color = type === 'success' ? '#28a745' : '#dc3545';
}

// Initialization
document.addEventListener('DOMContentLoaded', () => {
    applyTheme();
    
    if (window.location.pathname === '/profile.html') {
        fetch('/api/profile')
            .then(response => {
                if (!response.ok) window.location.href = '/';
                return response.json();
            })
            .then(data => {
                document.getElementById('username').textContent = data.username;
            });
    }
});