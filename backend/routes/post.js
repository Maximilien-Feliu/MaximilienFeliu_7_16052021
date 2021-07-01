const express = require('express'); 
 
const postCtrl = require('../controllers/posts.js');
const multer = require('../middleware/multer-config');              // import the multer configuration from the folder 'middleware'
const auth = require('../middleware/auth');
const regExp = require('../middleware/regExp');                                 // import regExp

const router = express.Router();

router.get('/', auth, postCtrl.getAllPosts);
router.post('/', auth, regExp.postOrComment, multer, postCtrl.createPost);
router.put('/:id', auth, regExp.postOrComment, multer, postCtrl.updatePost);
router.get('/:id', auth, postCtrl.getOnePost);
router.delete('/:id', auth, postCtrl.deletePost);

module.exports = router; 