const { mongoose, Schema, model } = require("mongoose");

const Tasker_CategorySchema = new mongoose.Schema({
    Name: {
        type: String,
        required: true
    },
    ColorCode: {
        type: String,
        required: true
    }

});

const Tasker_category = mongoose.model("TaskerCategory", Tasker_CategorySchema);

module.exports = Tasker_category;