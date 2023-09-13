const express = require('express');
const { createItem, getItem, getItems, updateItem, deleteItem } = require('../controllers/storage');
const router = express.Router()
const {validatorGetItem} = require('../validators/storage')
const {uploadMiddleware} = require('../utils/handleStorage');
const { uploadMiddleware2 } = require('../utils/handleStorage2');
const { isAuthenticated, isAdmin } = require('../helpers/auth');

router.get('/storage/',getItems)
router.get('/storage/:id',validatorGetItem ,getItem)
router.delete('/storage/:id',validatorGetItem, isAuthenticated, isAdmin ,deleteItem)

router.post('/storage/', uploadMiddleware.single('calendario'), isAuthenticated, isAdmin, (req, res)=>{
    res.redirect('/torneo')
})
router.post('/storage2/', uploadMiddleware2.single('calendario'), isAuthenticated, isAdmin, (req, res)=>{
    res.redirect('/')
})

module.exports = router;