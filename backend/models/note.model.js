const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const noteSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    status: {
        type: String,
        enum: ["Pending", "In Progress", "Done"],
        default: "Pending"
    },
    createdAt: { type: Date, default: Date.now },
    pinned: { type: Boolean, default: false },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" } // optional: link to user
});

module.exports = mongoose.model("Note", noteSchema);