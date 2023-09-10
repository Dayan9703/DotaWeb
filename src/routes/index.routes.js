const { Router } = require('express');
const router = Router();

const { renderAbout, renderIndex, renderTerms, renderAdmin, renderEditForm, updateUser, updateEquipo, renderEditFormEquipo, renderAdminUsers, renderEditFormFecha, updateFecha, renderAdminFechas, renderAdminFechas2 } = require('../controllers/index.controller')


const { getItems, updateItem } = require('../controllers/users.db')

const { isAuthenticated, isAdmin } = require('../helpers/auth');

router.get('/', renderIndex);

router.get('/terms', renderTerms);

router.get('/torneo', renderAdminFechas);

router.get('/adminfechas', renderAdminFechas2);

router.get('/adminequipos', isAuthenticated, isAdmin, renderAdmin);

router.get('/adminUsers', isAuthenticated, isAdmin, renderAdminUsers);

router.get('/get', isAuthenticated, getItems);

router.get('/update', isAuthenticated, updateItem);

router.get('/users/edit', isAuthenticated, isAdmin, renderEditForm);

router.put('/users/edit', isAuthenticated, isAdmin, updateUser);

router.get('/equipos/edit', isAuthenticated, isAdmin, renderEditFormEquipo);

router.put('/equipos/edit', isAuthenticated, isAdmin, updateEquipo);

router.get('/fechas/edit', isAuthenticated, isAdmin, renderEditFormFecha);

router.put('/fechas/edit', isAuthenticated, isAdmin, updateFecha);

module.exports = router;