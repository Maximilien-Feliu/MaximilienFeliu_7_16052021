const express = require('express'); 
 
const reactionCtrl = require('../controllers/postReaction.js');
const auth = require('../middleware/auth');

const router = express.Router();

router.get('/:id/postReaction', reactionCtrl.getAllReactions);
router.post('/:id/postReaction', auth, reactionCtrl.addReaction);
router.put('/:postId/postReaction/:id', auth, reactionCtrl.updateReaction);
router.delete('/:postId/postReaction/:id', auth, reactionCtrl.deleteReaction);

module.exports = router; 