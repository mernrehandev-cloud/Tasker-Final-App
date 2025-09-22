const { mongoose, Schema, model } = require("mongoose");

const Tasker_statusSchema = new mongoose.Schema({
    Name: {
        type: String,
        required: true
    },
    Icon: {
        type: String,
        required: true
    }
});

const Tasker_Status = mongoose.model("TaskerStatus", Tasker_statusSchema);

module.exports = Tasker_Status;