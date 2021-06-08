//const db = require( '../config/database.js');
const express = require('express'); 
 
const postCtrl = require('../controllers/post.js');
const multer = require('../middleware/multer-config');              // import the multer configuration from the folder 'middleware'

const router = express.Router();

router.get('/');
router.post('/');
router.put('/:id');
router.get('/:id');
router.delete('/:id');

module.exports = router;