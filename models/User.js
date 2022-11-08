const { Schema, model } = require('mongoose');
// const ThoughtSchema = require('./Thought');

const validateEmail = function(email) {
  const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return regex.test(email);
};

// Schema to create User model
const UserSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: [true, "Please enter your username"],
      Trimmed: true, // help in removing the white spaces present (beginning and ending of the string) in the string that you want to save to the DB 
      max_length: 50,
    },
    email: {
      type: String,
      unique: true,
      required: [true, "Please enter your email"],
      Trimmed: true, // help in removing the white spaces present (beginning and ending of the string) in the string that you want to save to the DB 
      validate: [validateEmail, "Please enter a valid email"],
      max_length: 50,
    },
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Thought',
      }
    ],
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
      }
    ]
  },
  {
    toJSON: {
      virtuals: true,
      getters: true
    },
    id: false,
  }
);

UserSchema.virtual("friendCount").get(function(){
  return this.friends.length;
});

const User = model('User', UserSchema);

module.exports = User;
