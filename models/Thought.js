const { Schema, model, Types } = require('mongoose');
const reactionSchema = require('./Reaction');
const dayjs = require('dayjs');

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
        reaction: [reactionSchema],
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