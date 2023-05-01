const { Schema, model, Types } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const reactionSchema = new Schema(
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

const thoughtSchema = new Schema(
    {
        // set custom id to avoid confusion with parent comment's _id field
        thoughtId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId(),
        },
        thoughtText: {
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
        reactions: [reactionSchema],
    },
    {
        toJSON: {
            getters: true,
        },
        id: false,
    }
);

thoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
});

const Thought = model('Thought', thoughtSchema);

module.exports = Thought;