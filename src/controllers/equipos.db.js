const { matchedData } = require('express-validator')

const Equipos = require('../models/Equipo');

const getItemsEquipos = async (req, res) => {
    try {
        const equipo = req.equipo
        const data = await Equipos.find({})
        res.send({ data, equipo });
    } catch (e) {
        console.log(e)
    }
};
const updateItemEquipo = async (req, res) => {
    try {
        const { id, ...body } = matchedData(req)
        const data = await Equipos.findOneAndUpdate(id, body)
        res.send({ data })
    } catch (e) {
        console.log(e)
    }
};

module.exports = { getItemsEquipos, updateItemEquipo };