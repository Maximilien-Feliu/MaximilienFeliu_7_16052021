const express = require('express'); 
 
const reactionCtrl = require('../controllers/postReaction.js');
const auth = require('../middleware/auth');

const router = express.Router();

router.get('/', auth, reactionCtrl.getAllReactions);
router.post('/:id', auth, reactionCtrl.addReaction);

module.exports = router; 