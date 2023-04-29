const { Schema, model, Types } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const ThoughtSchema = new Schema(
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
        reactions: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Reaction',
            },
        ],
    },
    {
        toJSON: {
            getters: true,
        },
        id: false,
    }
);

ThoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
});

const Thought = model('Thought', ThoughtSchema);

module.exports = Thought;