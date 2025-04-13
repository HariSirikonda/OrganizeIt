require("dotenv").config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const User = require("./models/user.model");
const Note = require("./models/note.model");


const app = express();
const PORT = 5000;

const jwt = require("jsonwebtoken");
const { authenticateToken } = require("./utilities");
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

//Login route
app.post("/login", async (req, res) => {
    const { email, password } = req.body;
    if (!email) {
        return res.status(400).json({ message: "Email is required..!" })
    }
    if (!password) {
        return res.status(400).json({ message: "Password is required..!" })
    }
    const userInfo = await User.findOne({ email: email });
    if (!userInfo) {
        return res.status(400).json({ message: "User Not Found" });
    }
    if (userInfo.email == email && userInfo.password == password) {
        const user = { user: userInfo };
        const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "36000m" });
        return res.json({
            error: false,
            message: "Login Successful",
            email,
            accessToken,
        });
    }
    else {
        return res.status(400).json({ error: true, message: "Invalid credentials" });
    }
});

//Add Note Route
app.post("/add-note", authenticateToken, async (req, res) => {
    const { title, description, status } = req.body;
    const { user } = req.user;
    if (!title) {
        return res.status(400).json({ error: true, message: "Tilte is required" });
    }
    if (!description) {
        return res.status(400).json({ error: true, message: "description is required" });
    }
    try {
        const note = new Note({
            title,
            description,
            status,
            userId: user._id,
        });
        await note.save();
        return res.json({ error: false, note, message: "Note-added Successfully" });
    }
    catch (error) {
        return res.status(500).json({ error: true, messsage: "Internal server Error" });
    }
});

//Edit Note Route
app.put("/edit-note/:noteId", authenticateToken, async (req, res) => {
    const noteId = req.params.noteId;
    const { title, description, status } = req.body;
    const { user } = req;

    if (!title && !description && !status) {
        return res.status(400).json({
            error: true,
            message: "No changes provided"
        });
    }

    try {
        const note = await Note.findById(noteId);

        if (!note) {
            return res.status(404).json({
                error: true,
                message: "Note not found"
            });
        }

        if (title) note.title = title;
        if (description) note.description = description;
        if (status) note.status = status;

        await note.save();

        return res.json({
            error: false,
            note,
            message: "Note updated successfully"
        });

    } catch (error) {
        return res.status(500).json({
            error: true,
            message: "Server error",
            details: error.message
        });
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
