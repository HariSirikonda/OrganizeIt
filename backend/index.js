require("dotenv").config();

const config = require("./config.json");
const mongoose = require("mongoose");

mongoose.connect(config.connectionString);

const express = require('express');
const cors = require('cors');
const user = require("./models/user.model")
const app = express();
const PORT = 5000;

const jwt = require("jsonwebtoken");
const { authenticateToken } = require("./utilities");
const { error } = require("ajv/dist/vocabularies/applicator/dependencies");
const { User } = require("lucide-react");

// Middleware
app.use(cors());
app.use(express.json());

// Test route
app.get('/', (req, res) => {
    res.json({ data: "Hello" });
});

//Create User
app.post("creat-account", async (req, res) => {
    const { fullName, email, password } = req.body;
    if (!fullName) {
        return res.status(400).json({ error: true, message: "Fullname is required" });
    }
    if (!email) {
        return res.status(400).json({ error: true, message: "email is required" });
    }
    if (!password) {
        return res.status(400).json({ error: true, message: "Password is required" });
    }
    const isUser = await user.findOne({ email: email });
    if (isUser) {
        return res.json({
            error: true,
            messsage: "User already Exist"
        });
    }
    const user = new user({
        fullName,
        email,
        password,
    });
    await user.same();
    const accessToken = jwt.sign({ user }, process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: "36000m",
        }
    );
    return res.json({
        error: false,
        user,
        accessToken,
        message: "Registration Successful"
    });
})


// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
