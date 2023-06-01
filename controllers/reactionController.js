const { Reaction } = require('../models');

module.exports = {
  // create a new user
  createReaction(req, res) {
    Reaction.create(req.body)
      .then((reaction) => res.json(reaction))
      .catch((err) => res.status(500).json(err));
  },
  // Delete a user and associated apps
  deleteReaction(req, res) {
    Reaction.findOneAndDelete({ _id: req.params.reactionId })
      .then(() => res.json({ message: 'Reaction deleted!' }))
      .catch((err) => res.status(500).json(err));
  },
}