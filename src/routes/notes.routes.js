const { Router } = require('express');
const router = Router()

const { 
    renderNoteForm,
    createNewNote, 
    renderNotes, 
    renderEditForm, 
    updateNote, 
    deleteNote 
} = require('../controllers/notes.controller');

const {isAuthenticated, isAdmin} = require('../helpers/auth');

//new notes
router.get('/notes/add',isAuthenticated, isAdmin, renderNoteForm);

router.post('/notes/new-note',isAuthenticated, isAdmin, createNewNote);

//get all routes
router.get('/notes',isAuthenticated, renderNotes);

//edit notes
router.get('/notes/edit/:id',isAuthenticated, isAdmin, renderEditForm);

router.put('/notes/edit/:id',isAuthenticated, isAdmin, updateNote);

//delete notes
router.delete('/notes/delete/:id',isAuthenticated, isAdmin, deleteNote);

module.exports = router;