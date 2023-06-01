const { User } = require('../models');

module.exports = {
  // Get all users
  getUsers(req, res) {
    User.find()
    .select('-__v')
      .then((users) => res.json(users))
      .catch((err) => res.status(500).json(err));
  },
  // Get a single user
  getSingleUser(req, res) {
    User.findOne({ _id: req.params.userId })
      .select('-__v')
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'No user with that ID' })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
  // create a new user
  createUser(req, res) {
    User.create(req.body)
    .select('-__v')
      .then((user) => res.json(user))
      .catch((err) => res.status(500).json(err));
  },
  // Delete a user and associated apps
  deleteUser(req, res) {
    User.findOneAndDelete({ _id: req.params.userId })
    .select('-__v')
      .then(() => res.json({ message: 'User deleted!' }))
      // link thoughts and delete them too
      .catch((err) => res.status(500).json(err));
  },
  // update by id
  updateUser(req, res) {
    User.findOneAndUpdate(
        { _id: req.params.userId },
        { username: req.body.username }
    )
    .select('-__v')
    .then((user) => res.json(user))
    .catch((err) => res.status(500).json(err)); 
  },
  // Add a friend
  addFriend(req, res) {    
    const userID = req.params.userId;
    const friendID = req.params.friendId;

    const updateFriendPromise = User.findOneAndUpdate(
        { _id: friendID },
        { $push: { friends: userID } }
    ).exec();

    const updateUserPromise = User.findOneAndUpdate(
        { _id: userID },
        { $push: { friends: friendID } }
    ).exec();

    Promise.all([updateFriendPromise, updateUserPromise])
        .then(([updatedFriend, updatedUser]) => {
            res.json({ updatedFriend, updatedUser });
        })
        .catch((err) => res.status(500).json(err));
  },
  // Delete a friend
  deleteFriend(req, res) {
    User.findOneAndDelete(
      { _id: req.params.userId },
      { $pull: { friends: friendId } },
      { new: true }
      )
      .select('-__v')
      .then((user) => {
        if (!user) {
          res.status(404).json({ message: 'No user with that ID' });
        } else {
          res.json(user);
        }
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  },
};