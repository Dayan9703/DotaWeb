const User = require("../models/User");
const Equipo = require("../models/Equipo");

const indexCtrl = {};

indexCtrl.renderIndex = (req, res) => {
    res.render('index')
};
indexCtrl.renderAbout = (req, res) => {
    res.render('about')
};

indexCtrl.renderTerms = (req, res) => {
    res.render('terms')
};

indexCtrl.renderAdmin = async (req, res) => {
    const equipo = req.equipo
    const data = await Equipo.find()
    res.render('admin', { data });
};

indexCtrl.renderAdminUsers = async (req, res) => {
    const user = req.user
    const data = await User.find()
    res.render('adminUsers', { data });
};

indexCtrl.renderEditFormEquipo = async (req, res) => {
    const equipoEdit = await Equipo.findById(req.params.id)
    res.render('equipos/edit-equipo', { equipoEdit });
};

indexCtrl.updateEquipo = async (req, res) => {
    const { equipo, pos1, pos2, pos3, pos4, pos5, suplente1, suplente2 } = req.body
    await Equipo.findByIdAndUpdate(req.params.id, { equipo, pos1, pos2, pos3, pos4, pos5, suplente1, suplente2 })
    res.redirect('/admin')
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
    res.redirect('/admin')
}

indexCtrl.deleteUser = async (req, res) => {
    await User.findByIdAndDelete(req.params.id);
    req.flash('success_msg', 'Usuario Eliminado Correctamente');
    res.redirect('/adminUser')
}
module.exports = indexCtrl;