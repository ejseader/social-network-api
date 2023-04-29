const { Schema, model, Types } = require('mongoose');

const ReactionSchema = new Schema(
  {
    // set custom id to avoid confusion with parent comment's _id field
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
    },
    reactionBody: {
      type: String,
      required: 'Reaction is required',
      maxlength: 280,
    },
    username: {
      type: String,
      required: 'Username is required',
    },
    createdAt: {
      type: Date,
      default: Date.now,
      // use getter method to format timestamp
      get: (createdAtVal) => dateFormat(createdAtVal),
    },
  },
  {
    toJSON: {
      getters: true,
    },
    id: false,
  }
);

const Reaction = model('Reaction', ReactionSchema);

module.exports = Reaction;