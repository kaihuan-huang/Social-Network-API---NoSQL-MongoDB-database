const { Schema, model } = require('mongoose');
const reactionSchema = require('./Reaction');

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
    },
    reactions: [reactionSchema], //Array of nested documents created with the reactionSchema
    createdAt: {
      type: Date,
      default: Date.now, //Use a getter method to format the timestamp on query?
    }
  },
  {
    toJSON: {
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
