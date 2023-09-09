const { Schema, model } = require('mongoose');
const bcrypt = require('bcryptjs');

const EquipoSchema = new Schema({
    equipo: { type: String, required: true, unique: true },
    pos1: { type: String, required: true, unique: true },
    pos2: { type: String, required: true, unique: true },
    pos3: { type: String, required: true, unique: true },
    pos4: { type: String, required: true, unique: true },
    pos5: { type: String, required: true, unique: true },
    suplente1: { type: String, required: false, unique: true },
    suplente2: { type: String, required: false, unique: true },
}, {
    timestamps: true
});


EquipoSchema.methods.encryptPassword = async password => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
};

EquipoSchema.methods.matchPassword = async function (password) {
    return await bcrypt.compare(password, this.password)
}

module.exports = model('Equipo', EquipoSchema);