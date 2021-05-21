const db = require( '../config/database.js');
const express = require('express'); 
 
const userCtrl = require('../controllers/user.js');

const router = express.Router();

router.post('/signup', userCtrl.signup);
router.post('/login');
router.get('/:id');
router.put('/:id');
router.delete('/:id');

module.exports = router; 

