const res = require("express/lib/response");

const Equipo = require('../models/Equipo');

const equiposCtrl = {};

equiposCtrl.renderNewEquipoForm = (req, res) => {
    res.render('equipos/new-equipo');
};

equiposCtrl.addEquipo = async (req, res) => {
    const { equipo, pos1, pos2, pos3, pos4, pos5, suplente1, suplente2 } = req.body;

    const newEquipo = new Equipo({ equipo, pos1, pos2, pos3, pos4, pos5, suplente1, suplente2 });
    await newEquipo.save();
    req.flash('success_msg', 'Solicitud de Equipo enviada');
    res.redirect('/torneo');

};

module.exports = equiposCtrl;