const Thought = require('../models/Thought');
const User = require('../models/User');

const thoughtController = {
  // Get all thoughts
  getThoughts(req, res) {
    Thought.find({})
      .populate({
        path: 'user',
        select: '-__v',
      })
      .select('-__v')
      .sort({ _id: -1 })
      .then((thoughts) => res.json(thoughts))
      .catch((err) => res.status(500).json(err));
  },
  // Get a single thought
  getSingleThought(req, res) {
    Thought.findOne({ _id: req.params.id })
      .populate({
        path: 'user',
        select: '-__v',
      })
      .select('-__v')
      .then((thought) => res.json(thought))
      .catch((err) => res.status(500).json(err));
  },
  // create a new thought
  createThought({ params, body }, res) {
    return Thought.create(body)
      .then(({ _id}) => {
        return User.findOneAndUpdate(
          { username: req.body.username },
          { $addToSet: { thoughts: _id } },
          { new: true }
        );
      })
      .then((dbUser) => {
        if (!dbUser) {
          res.status(404).json({ message: 'No user with that username' });
          return;
        }
        res.json(dbUser);
      })
      .catch((err) => res.status(500).json(err));
  },
  // Update a thought
  updateThought({ params, body }, res) {
    Thought.findOneAndUpdate(
      { _id: params.id }, 
      body,
      { new: true }
    )
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: 'No thought with that ID' })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },
  // Delete a thought
  deleteThought({ params }, res) {
    Thought.findOneAndDelete({ _id: params.id })
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: 'No thought with that ID' })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },
  // Delete user's thoughts when user is deleted
  // deleteUserThoughts({ params }, res) {
  //   Thought.deleteMany({ username: params.username })
  //     .then(() => res.json({ message: 'Thoughts deleted' }))
  //     .catch((err) => res.status(500).json(err));
  // },
  // Add a reaction
  addReaction({ params, body }, res) {
    Thought.findOneAndUpdate(
      { _id: params.thoughtId },
      { $addToSet: { reactions: body } },
      { runValidators: true, new: true }
    )
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: 'No thought with that ID' })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },
  // Remove a reaction
  removeReaction({ params }, res) {
    Thought.findOneAndUpdate(
      { _id: params.thoughtId },
      { $pull: { reactions: params.reactionId }},
      { runValidator: true, new: true }
    )
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: 'No thought with that ID' })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  }
};

module.exports = thoughtController;