const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    descr: {
        type: String,
        required: true
    },
    status: {
        type: String,
        default: "active"
    }
});

const Task = mongoose.model("Task", taskSchema);

module.exports = Task;