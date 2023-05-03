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

  module.exports = reactionSchema;