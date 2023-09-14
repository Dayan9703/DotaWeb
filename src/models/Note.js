const { Schema, model } = require('mongoose');
const bcrypt = require('bcryptjs');

const NoteSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    }
}, {
    timestamps: true
})

module.exports = model('Note', NoteSchema);