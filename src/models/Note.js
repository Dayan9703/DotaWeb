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
    },
    user: {
        type: String,
        required: true
    }
}, {
    timestamps: true
})

NoteSchema.methods.encryptPassword = async password => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
};

NoteSchema.methods.matchPassword = async function (password) {
    return await bcrypt.compare(password, this.password)
}


module.exports = model('Note', NoteSchema);