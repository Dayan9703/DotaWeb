const { Router } = require('express');
const { renderSignUpForm, signin, signup, renderSigninForm, logout } = require('../controllers/users.controller');
const router = Router();
const { isAuthenticated, isAdmin } = require('../helpers/auth');
const { renderEditForm, updateUser, updateEquipo, renderEditFormEquipo, deleteEquipo, deleteUser, updateFecha, deleteFecha, renderEditFormFecha } = require('../controllers/index.controller');
const { renderNewFechaForm, addFecha } = require('../controllers/fechas.controller');
const { renderNewEquipoForm, addEquipo} = require('../controllers/equipos.controller')

router.get('/users/signup', renderSignUpForm);
router.post('/users/signup', signup);

router.get('/users/signin', renderSigninForm);
router.post('/users/signin', signin);

router.get('/fechas/new-fecha', renderNewFechaForm);
router.post('/fechas/new-fecha', addFecha);

router.get('/equipos/new-equipo', renderNewEquipoForm);
router.post('/equipos/new-equipo', addEquipo);

router.get('/users/logout', logout);

router.get("/users/edit/:id", isAuthenticated, isAdmin, renderEditForm);
router.put("/users/edit/:id", isAuthenticated, isAdmin, updateUser);

router.get("/equipos/edit/:id", isAuthenticated, isAdmin, renderEditFormEquipo);
router.put("/equipos/edit/:id", isAuthenticated, isAdmin, updateEquipo);

router.get("/fechas/edit/:id", isAuthenticated, isAdmin, renderEditFormFecha);
router.put("/fechas/edit/:id", isAuthenticated, isAdmin, updateFecha);

router.delete('/equipos/delete/:id', isAuthenticated, isAdmin, deleteEquipo);

router.delete('/users/delete/:id', isAuthenticated, isAdmin, deleteUser);

router.delete('/fechas/delete/:id', isAuthenticated, isAdmin, deleteFecha);

module.exports = router;