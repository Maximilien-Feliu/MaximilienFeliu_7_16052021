const express = require('express'); 
 
const userCtrl = require('../controllers/user.js');
const multer = require('../middleware/multer-config');              // import the multer configuration from the folder 'middleware'
const auth = require('../middleware/auth.js');
const limiterLogin = require('../middleware/rateLimiterOnLoginEndPoint');
const limiterSignup = require('../middleware/rateLimiterOnSignupEndPoint');
const passwordValidator = require('../middleware/passwordValidator');
const regExp = require('../middleware/regExp.js');                                 // import regExp

const router = express.Router();

router.post('/', auth, userCtrl.getAllUsers);
router.post('/signup', limiterSignup, regExp.user, passwordValidator, multer, userCtrl.signup); 
router.post('/login', limiterLogin, regExp.user, multer, userCtrl.login);
router.get('/:id', auth, userCtrl.getOneUser);
router.put('/:id', auth, multer, userCtrl.updateUser);   
router.delete('/:id', auth, userCtrl.deleteUser);

module.exports = router; 

