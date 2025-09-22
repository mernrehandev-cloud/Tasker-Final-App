const { mongoose, Schema, model } = require("mongoose");

const TaskerTaskSchema = new mongoose.Schema({
    Title: {
        type: String,
        required: true
    },
    Desc: {
        type: String,
        required: true
    },
    DueDate: {
        type: Date,
        required: true
    },
    DueTime: {
        type: String,
        required: true
    },
    Progress: {
        type: Number,
        required: true
    },
    Category: {
        type: Schema.Types.ObjectId,
        ref: "TaskerCategory",
        required: true
    },
    Status: {
        type: Schema.Types.ObjectId,
        ref: "TaskerStatus",
        required: true
    }
},
    { timestamps: true }
);

const Tasker_Task = mongoose.model("TaskerTask", TaskerTaskSchema);

module.exports = Tasker_Task;