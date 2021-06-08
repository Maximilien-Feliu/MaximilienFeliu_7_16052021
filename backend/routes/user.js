const express = require('express'); 
 
const userCtrl = require('../controllers/user.js');
const multer = require('../middleware/multer-config');              // import the multer configuration from the folder 'middleware'

const router = express.Router();

router.get('/', userCtrl.getAllUsers);
router.post('/signup', multer, userCtrl.signup);
router.post('/login', multer, userCtrl.login);
router.get('/:id', userCtrl.getOneUser);
router.put('/:id', multer, userCtrl.updateUser); 
router.delete('/:id', userCtrl.deleteUser);

module.exports = router; 

