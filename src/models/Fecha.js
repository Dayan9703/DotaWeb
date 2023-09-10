const { Schema, model } = require('mongoose');
const bcrypt = require('bcryptjs');

const FechaSchema = new Schema({
    fecha: { type: String, required: true },
    equipo1: { type: String, required: true, unique: true },
    equipo2: { type: String, required: true, unique: true }
}, {
    timestamps: true
});


FechaSchema.methods.encryptPassword = async password => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
};

FechaSchema.methods.matchPassword = async function (password) {
    return await bcrypt.compare(password, this.password)
}

module.exports = model('Fecha', FechaSchema);