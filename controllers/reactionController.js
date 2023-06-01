const { Reaction, Application } = require('../models');

module.exports = {
    // Get all users
  getReaction(req, res) {
    User.find()
      .then((reaction) => res.json(reaction))
      .catch((err) => res.status(500).json(err));
  },
  // Get a single user
  getSingleReaction(req, res) {
    Reaction.findOne({ _id: req.params.reactionId })
      .select('-__v')
      .then((reaction) =>
        !reaction
          ? res.status(404).json({ message: 'No reaction with that ID' })
          : res.json(reaction)
      )
      .catch((err) => res.status(500).json(err));
  },
  // create a new user
  createReaction(req, res) {
    Reaction.create(req.body)
      .then((reaction) => res.json(reaction))
      .catch((err) => res.status(500).json(err));
  },
  // Delete a user and associated apps
  deleteReaction(req, res) {
    Reaction.findOneAndDelete({ _id: req.params.reactionId })
      .then((reaction) =>
        !reaction
          ? res.status(404).json({ message: 'No reaction with that ID' })
          : Application.deleteMany({ _id: { $in: reaction.applications } })
      )
      .then(() => res.json({ message: 'Reaction and associated apps deleted!' }))
      .catch((err) => res.status(500).json(err));
  },
}