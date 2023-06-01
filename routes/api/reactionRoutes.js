const router = require('express').Router();
const {
    getReaction,
    getSingleReaction,
    createReaction,
} = require('../../controllers/reactionController');

// /api/reaction
router.route('/').get(getReaction).post(createReaction);

// /api/users/:reactionId
router.route('/:reactionId').get(getSingleReaction);

module.exports = router;