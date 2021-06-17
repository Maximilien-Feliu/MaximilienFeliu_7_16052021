const express = require('express'); 
 
const userCtrl = require('../controllers/user.js');
const multer = require('../middleware/multer-config');              // import the multer configuration from the folder 'middleware'
const auth = require('../middleware/auth.js');

const router = express.Router();

router.get('/', auth, userCtrl.getAllUsers);
router.post('/signup', multer, userCtrl.signup);
router.post('/login', multer, userCtrl.login);
router.get('/:id', auth, userCtrl.getOneUser);
router.put('/:id', auth, multer, userCtrl.updateUser); 
router.delete('/:id', auth, userCtrl.deleteUser);

module.exports = router; 

