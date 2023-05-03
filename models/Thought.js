const { Schema, model, Types } = require('mongoose');
const dayjs = require('dayjs');

const reactionSchema = new Schema(
    {
      // set custom id to avoid confusion with parent comment's _id field
      reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId(),
      },
      reactionText: {
        type: String,
        required: true,
      },
      username: {
        type: String,
        required: true,
      },
      createdAt: {
        type: Date,
        default: Date.now,
        // use getter method to format timestamp
        get: (createdAtVal) => dayjs(createdAtVal).format('YYYY-MM-DDThh:mm:ss a'),
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
        username: {
            type: String,
            required: true,
        },
        thoughtText: {
            type: String,
            required: true,
            minlength: 1,
            maxlength: 280,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            // use getter method to format timestamp
            get: (createdAtVal) => dayjs(createdAtVal).format('YYYY-MM-DDThh:mm:ss a'),
        },
        reactions: [reactionSchema],
    },
    {
        toJSON: {
            getters: true,
            virtuals: true,
        },
        id: false,
    }
);

thoughtSchema.virtual('reactionCount').get(function () {
    return this.reaction.length;
});

const Thought = model('thought', thoughtSchema);

module.exports = Thought;