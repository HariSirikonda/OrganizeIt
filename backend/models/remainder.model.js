const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reminderSchema = new Schema({
    noteName: { type: String, required: true },
    setDateTime: { type: Date, required: true },
    status: {
        type: String,
        enum: ["Pending", "Done"],
        default: "Pending"
    },
});

module.exports = mongoose.model("Reminder", reminderSchema);