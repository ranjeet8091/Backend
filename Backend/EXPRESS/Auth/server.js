const express = require('express');
const app = express();
const fs=require("fs")
const url=require("url")
const PORT = 3000;

// Dummy users (for demonstration purposes)
const users = [
    { id: 1, username: 'user1', password: 'password1' },
    { id: 2, username: 'user2', password: 'password2' }
];

// Middleware to simulate user authentication
const authenticateUser = (req, res, next) => {
    // Check if user is authenticated
    if (req.session && req.session.user) {
        return next(); // User is authenticated, proceed to the next middleware
    }
    // User is not authenticated, redirect to login page
    res.redirect('/login');
};

// Middleware to log in user
const loginUser = (req, res, next) => {
    const { username, password } = req.body;
    // Check if the provided username and password match any user in the database
    const user = users.find(user => user.username === username && user.password === password);
    if (user) {
        // Set user session
        req.session.user = user;
        res.redirect('/dashboard');
    } else {
        res.status(401).send('Invalid username or password');
    }
};

// Login route
app.post('/login', loginUser);

// Dashboard route (accessible only to authenticated users)
app.get('/dashboard', authenticateUser, (req, res) => {
    res.send(`Welcome ${req.session.user.username} to the dashboard!`);
});

// Logout route
app.get('/logout', (req, res) => {
    // Destroy session to log out user
    req.session.destroy(err => {
        if (err) {
            console.error('Error destroying session:', err);
            res.sendStatus(500);
        } else {
            res.redirect('/login');
        }
    });
});

// Login page
app.get('/login', (req, res) => {
    fs.readFile("login.html",(err,data)=>{
        if(err)
        {
            console.log(err);
        }
        else
        {
            res.writeHead(200,{"content-type":"text,html"})
            res.write(data);
            res.end();
        }
    })
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
