const { mongoose, SchemaTypes, Schema, model } = require("mongoose");

const UserSchema = new mongoose.Schema({
    Name: {
        type: String,
        required: true
    },
    // ApiKey: {
    //     type: String,
    //     required: true
    // },
    BirthDate: {
        type: Date,
        required: true
    },
    ContactNumber: {
        type: Number,
        required: true
    },
    Email: {
        type: String,
        required: true
    },
    Image: {
        type: String,
        required: true
    },
    // LoginID: {
    //     type: Schema.Types.ObjectId,
    //     required: true
    // },
    Password: {
        type: String,
        required: true
    },
    SecurityAnswer: {
        type: String,
        required: true
    },
    SecurityQuestion: {
        type: String,
        required: true
    },
    // Role: {
    //     type: Schema.Types.ObjectId,
    //     ref: "Role",
    //     required: true
    // },
});

const User = mongoose.model("User", UserSchema);

module.exports = User;