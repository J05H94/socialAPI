const { User, reactionSchema, Thought } = require('../models');

module.exports = {
  // Get all thoughts
  getThought(req, res) {
    Thought.find()
    .select('-__v')
      .then((thought) => res.json(thought))
      .catch((err) => res.status(500).json(err));
  },
  // Get a single thought
  getSingleThought(req, res) {
    Thought.findOne({ _id: req.params.thoughtId })
      .select('-__v')
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: 'No thought with that ID' })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },
  // create a new thought
  createThought(req, res) {
    Thought.create(req.body)
    .then((thought) => {
      return User.findOneAndUpdate(
        { username: req.body.username },
        { $addToSet: { thoughts: thought._id } },
        { new: true }
      );
    })
      .then((thought) => res.json(thought))
      .catch((err) => res.status(500).json(err));
  },
  // Delete a thought and associated apps
  deleteThought(req, res) {
    Thought.findOneAndDelete({ _id: req.params.thoughtId })
      .then(() => res.json({ message: 'Begone Thought!' }))
      .catch((err) => res.status(500).json(err));
  },
  updateThought(req, res){
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { thoughtText: req.body.thoughtText }
    )
    .then((user) => res.json(user))
    .catch((err) => res.status(500).json(err));
  },
  // Create a reaction
  createReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      {$addToSet: { reactions: {
        reactionBody: req.body.reactionBody,
        username: req.body.username,
        createdAt: new Date()
      }}},
      {new: true}
    )
    .select('-__v')
    .then((reaction) => res.json(reaction))
    .catch((err) => res.status(500).json(err));
  },
  // Delete a reaction
  deleteReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      {$pull: { reactions: {
        _id: req.params.reactionsId,
      }}},
      {new: true}
    )
    .select('-__v')
      .then(() => res.json({ message: 'Reaction deleted!' }))
      .catch((err) => res.status(500).json(err));
  },
}