const express = require('express'); 
 
const postCtrl = require('../controllers/posts.js');
const multer = require('../middleware/multer-config');              // import the multer configuration from the folder 'middleware'
const auth = require('../middleware/auth');

const router = express.Router();

router.get('/', auth, postCtrl.getAllPosts);
router.get('/user/:id', auth, postCtrl.getAllPostsByUserId);
router.post('/', auth, multer, postCtrl.createPost);
router.put('/:id', auth, multer, postCtrl.updatePost);
router.get('/:id', auth, postCtrl.getOnePost);
router.delete('/:id', auth, postCtrl.deletePost); 

module.exports = router; 