const express = require('express');
const { createItem, getItem, getItems, updateItem, deleteItem } = require('../controllers/storage');
const router = express.Router()
const { uploadMiddleware2 } = require('../utils/handleStorage2');
const { isAdmin, isAuthenticated } = require('../helpers/auth');


router.post('/storage2/', uploadMiddleware2.single('calendario'), isAuthenticated, isAdmin, (req, res)=>{
    res.redirect('/')
})

module.exports = router;