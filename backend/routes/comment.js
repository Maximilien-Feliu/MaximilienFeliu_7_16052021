const express = require('express'); 
 
const commentCtrl = require('../controllers/comment.js');
const multer = require('../middleware/multer-config');              // import the multer configuration from the folder 'middleware'
const auth = require('../middleware/auth.js');
const regExp = require('../middleware/regExp');                                 // import regExp

const router = express.Router();      

router.get('/:id/comment', auth, commentCtrl.getAllComments);
router.post('/:id/comment', auth, regExp.postOrComment, multer, commentCtrl.createComment);
router.put('/:postId/comment/:id', auth, regExp.postOrComment, multer, commentCtrl.updateComment);
router.get('/:postId/comment/:id', auth, commentCtrl.getOneComment);
router.delete('/:postId/comment/:id', auth, commentCtrl.deleteComment);

module.exports = router;