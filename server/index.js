const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const session = require('express-session');
const cors = require('cors');

const app = express();

// Allow CORS for your frontend domain
app.use(cors({
    origin: "https://farm-nexus-frontend.vercel.app/", // Add your frontend domain
    methods: ["GET", "POST"],
    credentials: true, // Allow credentials if needed
}));

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '..', 'public'))); // Adjusted static path

// Configure session
app.use(session({
    secret: 'farmnexus_secret',
    resave: false,
    saveUninitialized: false,
}));

// Connect to MongoDB
mongoose.connect('mongodb+srv://dhruva20052706:NNFQgBubEBmMiqwk@cluster0.43s6x.mongodb.net/farmnexus?retryWrites=true&w=majority&appName=Cluster0')
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('Error connecting to MongoDB:', err));

// Define Mongoose Schema
const userSchema = new mongoose.Schema({
    name: String,
    state: String,
    district: String,
    age: Number,
    role: String, // buyer or seller
});

const User = mongoose.model('User', userSchema);

// Middleware to check if the user is authenticated
function isAuthenticated(req, res, next) {
    if (req.session.user) {
        return next(); // Proceed to /main
    } else {
        res.redirect('/?error=signin-first'); // Redirect to index page with error
    }
}

// Routes

// index Page (includes Sign Up and Sign In forms)
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'index.html')); // Adjusted path
});

// Handle Sign-Up
app.post('/signup', async (req, res) => {
    const { name, state, district, age, role } = req.body;

    const newUser = new User({
        name,
        state,
        district,
        age,
        role,
    });

    try {
        await newUser.save();
        console.log('User registered:', newUser);
        req.session.user = { name: newUser.name, id: newUser._id }; // Save user in session
        res.redirect('/main');
    } catch (err) {
        console.error('Error saving user:', err);
        res.status(500).send('Error registering user.');
    }
});

// Handle Sign-In
app.post('/signin', async (req, res) => {
    const { name } = req.body;

    try {
        const user = await User.findOne({ name });
        if (user) {
            console.log('User logged in:', user);
            req.session.user = { name: user.name, id: user._id }; // Save user in session
            res.redirect('/main');
        } else {
            res.redirect('/?error=signup-first'); // Redirect to index page with error
        }
    } catch (err) {
        console.error('Error during sign-in:', err);
        res.status(500).send('Error logging in.');
    }
});

// Main Page (Only for Signed-In Users)
app.get('/main', isAuthenticated, (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'main.html')); // Adjusted path
});

// Route to get logged-in user's information
app.get('/user-info', isAuthenticated, (req, res) => {
    res.json({ name: req.session.user.name });
});

// Start the Server
app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});
