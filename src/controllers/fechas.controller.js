const res = require("express/lib/response");

const Fecha = require('../models/Fecha');

const fechasCtrl = {};

fechasCtrl.renderNewFechaForm = (req, res) => {
    res.render('fechas/new-fecha');
};

fechasCtrl.addFecha = async (req, res) => {
    const { fecha, equipo1, equipo2 } = req.body;

    const newFecha = new Fecha({ fecha, equipo1, equipo2 });
    await newFecha.save();
    req.flash('success_msg', 'Fecha Creada');
    res.redirect('/adminfechas');

};

module.exports = fechasCtrl;