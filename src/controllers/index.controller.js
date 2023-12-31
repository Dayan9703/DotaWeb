const User = require("../models/User");
const Equipo = require("../models/Equipo");
const Fecha = require("../models/Fecha");
const Note = require("../models/Note");

const indexCtrl = {};

indexCtrl.renderIndex = async(req, res) => {
    const notes = await Note.find();
    res.render('index', {notes})
};
indexCtrl.renderAbout = (req, res) => {
    res.render('torneo')
};

indexCtrl.renderTerms = (req, res) => {
    res.render('terms')
};

indexCtrl.renderAdmin = async (req, res) => {
    const equipo = req.equipo
    const data = await Equipo.find()
    res.render('adminequipos', { data });
};

indexCtrl.renderAdminUsers = async (req, res) => {
    const user = req.user
    const data = await User.find()
    res.render('adminUsers', { data });
};

indexCtrl.renderAdminFechas = async (req, res) => {
    const fecha = req.fecha
    const data = await Fecha.find()
    res.render('torneo', { data });
};

indexCtrl.renderAdminFechas2 = async (req, res) => {
    const fecha = req.fecha
    const data = await Fecha.find()
    res.render('adminfechas', { data });
};

indexCtrl.renderEditFormEquipo = async (req, res) => {
    const equipoEdit = await Equipo.findById(req.params.id)
    res.render('equipos/edit-equipo', { equipoEdit });
};

indexCtrl.updateEquipo = async (req, res) => {
    const { equipo, pos1, pos2, pos3, pos4, pos5, suplente1, suplente2 } = req.body
    await Equipo.findByIdAndUpdate(req.params.id, { equipo, pos1, pos2, pos3, pos4, pos5, suplente1, suplente2 })
    res.redirect('/adminequipos')
};

indexCtrl.renderEditFormFecha = async (req, res) => {
    const fechaEdit = await Fecha.findById(req.params.id)
    res.render('fechas/edit-fecha', { fechaEdit });
};

indexCtrl.updateFecha = async (req, res) => {
    const { fecha, equipo1, equipo2 } = req.body
    await Fecha.findByIdAndUpdate(req.params.id, { fecha, equipo1, equipo2 })
    res.redirect('/adminfechas')
};

indexCtrl.renderEditForm = async (req, res) => {
    const userEdit = await User.findById(req.params.id)
    res.render('users/edit-user', { userEdit });
};

indexCtrl.updateUser = async (req, res) => {
    const { userType } = req.body
    await User.findByIdAndUpdate(req.params.id, { userType })
    res.redirect('/adminUsers')
};

indexCtrl.deleteEquipo = async (req, res) => {
    await Equipo.findByIdAndDelete(req.params.id);
    req.flash('success_msg', 'Equipo Eliminado Correctamente');
    res.redirect('/adminequipos')
}

indexCtrl.deleteFecha = async (req, res) => {
    await Fecha.findByIdAndDelete(req.params.id);
    req.flash('success_msg', 'Fecha Eliminada Correctamente');
    res.redirect('/adminfechas')
}

indexCtrl.deleteUser = async (req, res) => {
    await User.findByIdAndDelete(req.params.id);
    req.flash('success_msg', 'Usuario Eliminado Correctamente');
    res.redirect('/adminUsers')
}
module.exports = indexCtrl;