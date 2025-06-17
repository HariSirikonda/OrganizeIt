const cron = require("node-cron");
const nodemailer = require("nodemailer");
const Note = require("./models/note.model"); // adjust path as needed
const User = require("./models/user.model"); // assuming you have a user model
require("dotenv").config(); // if you're using environment variables

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
    tls: {
        rejectUnauthorized: false,
    },
});


cron.schedule("* * * * *", async () => {
    console.log("⏰ Running reminder check at:", new Date().toLocaleString());
    const now = new Date();
    const dueNotes = await Note.find({
        isReminderSet: true,
        reminderDate: { $lte: now },
    }).populate("userId");

    for (const note of dueNotes) {
        await transporter.sendMail({
            to: note.userId.email,
            subject: `OrganizeIt Reminder: ${note.title}`,
            text: note.description,
        });
        console.log(`📧 Reminder sent to ${note.userId.email} for note: ${note.title}`);

        note.reminderDate = null;
        note.isReminderSet = false;
        await note.save();
    }
});

module.exports = {}; // Optional
