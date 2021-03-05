const mongoose = require("mongoose");

const TodoSchema = new mongoose.Schema({
    title: String,
    description: String,
    status: String,
    exp: Date
});

module.exports = mongoose.model("Todo", TodoSchema);