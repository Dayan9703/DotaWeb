const { matchedData } = require('express-validator')

const Fechas = require('../models/Fecha');

const getItemsFechas = async (req, res) => {
    try {
        const fecha = req.fecha
        const data = await Fechas.find({})
        res.send({ data, fecha });
    } catch (e) {
        console.log(e)
    }
};
const updateItemFecha = async (req, res) => {
    try {
        const { id, ...body } = matchedData(req)
        const data = await Fechas.findOneAndUpdate(id, body)
        res.send({ data })
    } catch (e) {
        console.log(e)
    }
};

module.exports = { getItemsFechas, updateItemFecha };