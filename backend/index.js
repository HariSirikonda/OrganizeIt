require("dotenv").config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const jwt = require("jsonwebtoken");
const User = require("./models/user.model"); // assuming your schema is exported properly

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json()); // required to parse JSON body

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.error("MongoDB connection error:", err));

// Test route
app.get('/', (req, res) => {
    res.json({ data: "Hello" });
});

// Create Account Route
app.post("/create-account", async (req, res) => {
    const { fullName, email, password } = req.body;

    if (!fullName || !email || !password) {
        return res.status(400).json({ error: true, message: "All fields are required" });
    }

    const isUser = await User.findOne({ email });
    if (isUser) {
        return res.json({ error: true, message: "User already exists" });
    }

    const newUser = new User({ fullName, email, password });
    await newUser.save();

    const accessToken = jwt.sign({ id: newUser._id }, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "36000m"
    });

    return res.json({
        error: false,
        user: newUser,
        accessToken,
        message: "Registration Successful"
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
