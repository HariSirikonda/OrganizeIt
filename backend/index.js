require("./reminderScheduler");
require("dotenv").config();
const bcrypt = require('bcryptjs');
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const User = require("./models/user.model");
const Note = require("./models/note.model");


const app = express();
const PORT = process.env.PORT || 5000;

const jwt = require("jsonwebtoken");
const { authenticateToken } = require("./utilities");
const { urlencoded } = require("body-parser");
// Middleware
app.use(cors());
app.use(express.json()); // required to parse JSON body
app.use(urlencoded({ extended: true }));

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
    const { fullName, email, password, isGoogleAuth } = req.body;

    if (!fullName || !email || (!password && !isGoogleAuth)) {
        return res.status(400).json({ error: true, message: "Required fields missing" });
    }

    const isUser = await User.findOne({ email });

    if (isUser) {
        return res.json({ error: true, message: "User already exists" });
    }

    let hashedPassword = '';

    if (isGoogleAuth) {
        // For Google users, use a fake password (hashed)
        const salt = await bcrypt.genSalt(10);
        hashedPassword = await bcrypt.hash(password || email + Date.now(), salt);
    } else {
        // For manual signup
        const salt = await bcrypt.genSalt(10);
        hashedPassword = await bcrypt.hash(password, salt);
    }

    const newUser = new User({ fullName, email, password: hashedPassword });
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
        return res.status(400).json({ message: "Email is required..!" });
    }
    if (!password) {
        return res.status(400).json({ message: "Password is required..!" });
    }

    const userInfo = await User.findOne({ email: email });
    if (!userInfo) {
        return res.status(400).json({ message: "User Not Found" });
    }

    const isMatch = await bcrypt.compare(password, userInfo.password);

    if (isMatch) {
        const user = { user: userInfo };
        const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "36000m" });

        return res.json({
            error: false,
            message: "Login Successful",
            email,
            accessToken,
            user: {
                _id: userInfo._id,
                fullName: userInfo.fullName
            }
        });
    } else {
        return res.status(400).json({ error: true, message: "Invalid credentials" });
    }
});


// Get User
app.get("/get-user", authenticateToken, async (req, res) => {
    const { user } = req.user;

    try {
        const isUser = await User.findOne({ _id: user._id });

        if (!isUser) {
            return res.sendStatus(401);
        }

        return res.json({
            error: false,
            user: {
                fullName: isUser.fullName,
                email: isUser.email,
                _id: isUser._id,
                createdOn: isUser.createdOn,
            },
            message: "User fetched successfully",
        });
    } catch (error) {
        return res.status(500).json({
            error: true,
            message: "Internal Server Error",
        });
    }
});



//Add Note Route
app.post("/add-note", authenticateToken, async (req, res) => {
    const { title, description, status, reminderDate, isReminderSet } = req.body;
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
            reminderDate: reminderDate === "" ? "" : new Date(reminderDate),
            isReminderSet,
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
    const { title, description, status, reminderDate, isReminderSet } = req.body;
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
        if (reminderDate) reminderDate = reminderDate === "" ? "" : new Date(reminderDate);
        if (isReminderSet) note.isReminderSet = isReminderSet;

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

// Get All Notes
app.get("/get-all-notes", authenticateToken, async (req, res) => {
    const { user } = req.user;

    try {
        const notes = await Note.find({ userId: user._id }).sort({ isPinned: -1 });

        return res.json({
            error: false,
            notes,
            message: "All notes retrieved successfully",
        });
    } catch (error) {
        return res.status(500).json({
            error: true,
            message: "Internal Server Error",
        });
    }
});
app.get("/analytics/notifications", authenticateToken, async (req, res) => {
    const { user } = req.user;
    try {
        const now = new Date();
        const notes = await Note.find({ userId: user._id }).select(
            "title description status reminderDate isReminderSet createdAt isPinned"
        );

        let counts = {
            totalNotes: 0,
            byStatus: { Pending: 0, "In Progress": 0, Done: 0 },
            reminderSet: 0,
            reminderNotSet: 0,
            upcoming: 0,
            overdue: 0,
            sent: 0,
        };

        const annotated = notes.map((n) => {
            counts.totalNotes += 1;
            if (n.status && counts.byStatus[n.status] !== undefined) {
                counts.byStatus[n.status] += 1;
            }

            let reminderStatus = "none";
            if (n.isReminderSet && n.reminderDate) {
                counts.reminderSet += 1;
                if (n.reminderDate <= now) {
                    reminderStatus = "overdue";
                    counts.overdue += 1;
                } else {
                    reminderStatus = "upcoming";
                    counts.upcoming += 1;
                }
            } else if (!n.isReminderSet && n.reminderDate && n.reminderDate <= now) {
                reminderStatus = "sent";
                counts.sent += 1;
                counts.reminderNotSet += 1;
            } else {
                counts.reminderNotSet += 1;
            }

            return {
                _id: n._id,
                title: n.title,
                description: n.description,
                status: n.status,
                reminderDate: n.reminderDate,
                isReminderSet: n.isReminderSet,
                reminderStatus,
                createdAt: n.createdAt,
                isPinned: n.isPinned,
            };
        });

        return res.json({
            error: false,
            summary: counts,
            notes: annotated,
            message: "Analytics computed successfully",
        });
    } catch (error) {
        return res.status(500).json({ error: true, message: "Internal Server Error" });
    }
});

//Delete Note
app.delete("/delete-note/:noteId", authenticateToken, async (req, res) => {
    const noteId = req.params.noteId;
    const { user } = req.user;
    try {
        const note = await Note.findOne({ _id: noteId, userId: user._id });

        if (!note) {
            return res.status(404).json({ error: true, message: "Note not found" });
        }

        await Note.deleteOne({ _id: noteId, userId: user._id });

        return res.json({
            error: false,
            message: "Note deleted successfully",
        });
    } catch (error) {
        return res.status(500).json({
            error: true,
            message: "Internal Server Error",
        });
    }
});

//update Pinned
app.put("/update-note/:noteId", authenticateToken, async (req, res) => {
    const noteId = req.params.noteId;
    const { pinned } = req.body;
    const { user } = req;

    try {
        const note = await Note.findById(noteId);

        if (!note) {
            return res.status(404).json({
                error: true,
                message: "Note not found"
            });
        }

        // if (pinned) note.isPinned = pinned;
        if (typeof pinned === "boolean") note.isPinned = pinned;

        await note.save();

        return res.json({
            error: false,
            note,
            message: "Note updated successfully"
        });

    } catch (error) {
        return res.status(500).json({
            error: true,
            message: "Internal Server error",
            details: error.message
        });
    }
});

// Start server
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
