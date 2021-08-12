const express = require('express'); 
 
const reactionCtrl = require('../controllers/commentReaction.js');
const auth = require('../middleware/auth');

const router = express.Router();

router.post('/:id/commentReaction', auth, reactionCtrl.addReaction);
router.put('/:commentId/commentReaction/:id', auth, reactionCtrl.updateReaction);
router.delete('/:commentId/commentReaction/:id', auth, reactionCtrl.deleteReaction);

module.exports = router; 