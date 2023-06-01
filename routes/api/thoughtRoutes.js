const router = require('express').Router();
const Thought = require('../../models/thought')
const {
  getThought,
  getSingleThought,
  createThought,
  updateThought,
  deleteThought,
} = require('../../controllers/thoughtController');

const {
  getReaction,
  getSingleReaction,
  createReaction,
  deleteReaction,
} = require('../../controllers/reactionController');

// /api/thoughts
router.route('/').get(getThought).post(createThought);
// /api/thought/:thoughtId
router.route('/:thoughtId').get(getSingleThought).put(updateThought).delete(deleteThought);
// /api/thoughts/:thoughtId/reactions
router.route('/:thoughtId/reactions').post(createReaction).delete(deleteReaction)

module.exports = router;