const express = require('express'); 
 
const reactionCtrl = require('../controllers/postReaction.js');
const auth = require('../middleware/auth');

const router = express.Router();

router.get('/', reactionCtrl.getAllReactions);
router.post('/', auth, reactionCtrl.addReaction);
router.put('/:id', auth, reactionCtrl.updateReaction);
router.delete('/:id', auth, reactionCtrl.deleteReaction);

module.exports = router; 