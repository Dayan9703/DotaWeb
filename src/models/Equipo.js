const { Schema, model } = require('mongoose');
const bcrypt = require('bcryptjs');

const EquipoSchema = new Schema({
    equipo: { type: String, required: true},
    pos1: { type: String, required: true},
    pos2: { type: String, required: true},
    pos3: { type: String, required: true},
    pos4: { type: String, required: true},
    pos5: { type: String, required: true},
    suplente1: { type: String, required: false},
    suplente2: { type: String, required: false},
}, {
    timestamps: true
});

module.exports = model('Equipo', EquipoSchema);