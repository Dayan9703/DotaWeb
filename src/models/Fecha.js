const { Schema, model } = require('mongoose');
const bcrypt = require('bcryptjs');

const FechaSchema = new Schema({
    fecha: { type: String, required: true },
    equipo1: { type: String, required: true, unique: false },
    equipo2: { type: String, required: true, unique: false }
}, {
    timestamps: true
});

module.exports = model('Fecha', FechaSchema);