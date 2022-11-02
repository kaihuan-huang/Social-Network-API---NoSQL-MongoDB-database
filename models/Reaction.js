const { Schema, model, Types } = require('mongoose');
const moment = require('moment')
// Schema to create a react model
const ReactionSchema = new Schema(
  {
    reactionId: {
      type: Schema.Types.ObjectId, //Use Mongoose's ObjectId data type
      required: true,
      default: new Schema.Types.ObjectId, //Default value is set to a new ObjectId
    },
    reactionBody: {
      type: String,
      required: true,
      max_length: 280,
    },
    username: {
      type: String,
      required: [true, "Please enter your username"]
    },
    createdAt: {
      type: Date,
      default: Date.now, //Use a getter method to format the timestamp on query?
      get: (createdAtVal) => moment(createdAtVal).format('MMM DD, YYYY [at] hh:mm a')

    }
    
  },
  {
    toJSON: {
      virtuals: true,
      getters: true
    },
  }
);
//?This will not be a model, but rather will be used as the reaction field's subdocument schema in the Thought model.

module.exports = ReactionSchema;
