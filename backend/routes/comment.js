const express = require('express'); 
 
const commentCtrl = require('../controllers/comment.js');
const multer = require('../middleware/multer-config');              // import the multer configuration from the folder 'middleware'
const auth = require('../middleware/auth.js')

const router = express.Router();

router.get('/', auth, commentCtrl.getAllComments);
router.post('/', auth, multer, commentCtrl.createComment);
router.put('/:id', auth, multer, commentCtrl.updateComment);
router.delete('/:id', auth, commentCtrl.deleteComment);

module.exports = router;