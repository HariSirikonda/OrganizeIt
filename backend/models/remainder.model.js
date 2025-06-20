const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reminderSchema = new Schema({
    noteName: { type: String, required: true },
    setDateTime: { type: Date, required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    status: {
        type: String,
        enum: ["Active", "Inactive"],
        default: "Inactive"
    },
});

module.exports = mongoose.model("Reminder", reminderSchema);