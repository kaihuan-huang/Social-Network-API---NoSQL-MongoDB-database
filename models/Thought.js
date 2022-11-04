const { Schema, model } = require('mongoose');
const ReactionSchema = require('./Reaction');
// const moment = require('moment')
const ThoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      maxlength: 280,
      minlength: 1,
    },
    username: {
      type: String,
      required: true,
    },// Use ReactionsSchema to validate data
    reactions: [ReactionSchema], //Array of nested documents created with the reactionSchema
    createdAt: {
      type: Date,
      default: Date.now, //Use a getter method to format the timestamp on query?
      // get: (createdAtVal) => moment(createdAtVal).format('MMM DD, YYYY [at] hh:mm a')
    }
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
    id: false,
  }
);
//Create a virtual called reactionCount that retrieves the length of the thought's reactions array field on query.
ThoughtSchema.virtual("reactionCount").get(function(){
  return this.reactions.length;
});

const Thought = model('thought', ThoughtSchema);

module.exports = Thought;
