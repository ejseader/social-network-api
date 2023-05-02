const { User, Thought } = require('../models');

const userController = {
  // Get all users
  getUsers(req, res) {
    User.find({})
      .populate({
        path: 'thoughts',
        select: '-__v',
      })
      .select('-__v')
      .then((users) => res.json(users))
      .catch((err) => res.status(500).json(err));
  },
  // Get a single user
  getSingleUser({ params }, res) {
    User.findOne({ _id: params.id })
      .populate({
        path: 'thoughts',
        select: '-__v',
      })
      .populate({
        path: 'friends',
        select: '-__v',
      })
      .select('-__v')
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'No user with that ID' })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
  // create a new user
  createUser({ body }, res) {
    User.create(body)
      .then((dbUser) => res.json(dbUser))
      .catch((err) => res.status(500).json(err));
},
  // Update a user
  updateUser({ params, body }, res) {
    User.findOneAndUpdate(
      { _id: params.id },
      body,
      { runValidators: true, new: true }
    )
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'No user with that ID' })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
  // Delete a user and associated thoughts
  deleteUser({ params }, res) {
    User.findOneAndDelete({ _id: params.id })
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'No user with that ID' })
          : res.json(user),
      )
      .catch((err) => res.status(500).json(err));
  },
  // Add a friend
  addFriend({ params }, res) {
    User.findOneAndUpdate(
      { _id: params.userId }, 
      { $addToSet: { friends: params.friendId } }, 
      { runValidators: true, new: true })
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'No user with that ID' })
          : res.json(user)
      )
  },
  // Remove a friend
  removeFriend({ params }, res) {
    User.findOneAndUpdate(
      { _id: params.userId }, 
      { $pull: { friends: params.friendId } }, 
      { runValidators: true, new: true })
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'No user with that ID' })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  }
};

module.exports = userController;