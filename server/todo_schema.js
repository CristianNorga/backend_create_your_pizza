const mongoose = require("mongoose");

// Schema for todo
const todoSchema = mongoose.Schema({
    nombreCompleto: {
        type: String,
        required: true
    },
    newTodo: {
        type: Boolean,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    usuario: {
        type: String,
        required: true
    },
    direccion: {
        type: Number,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true
    }
});

const todo = (module.exports = mongoose.model("todo", todoSchema));