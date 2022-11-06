const { ObjectId } = require('mongoose').Types;
const { User} = require('../models');

// Aggregate function to get the number of friends overall
const friendCount = async () =>
  User.aggregate()
    .count('friendCount')
    .then((numberOfFriends) => numberOfFriends);


module.exports = {
  // Get all users
  getUsers(req, res) {
    User.find()
      .then(async (users) => {
        const userObj = {
          users,
          friendCount: await friendCount,
        };
        return res.json(userObj);
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
  // Get a single user
  getSingleUser(req, res) {
    User.findOne({ _id: req.params.userId  })
      .select('-__v')//?
      .then(async (user) =>
        !user
          ? res.status(404).json({ message: 'No user with that email' })
          : res.json(user))
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
  /* create a new user·
  {
  "username": "lernantino",
  "email": "lernantino@gmail.com"
}

   */
  createUser(req, res) {
    User.create(req.body)
      .then((user) => res.json(user))
      .catch((err) => res.status(500).json(err));
  },
 
  // Delete a student and remove them from the course
  deleteUser(req, res) {
    User.findOneAndRemove({ _id: req.params.userId })
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'No such user exists' })
          : Thought.deleteMany({_id: { $in: user.thoughts}})) //?
      .then((thought) =>
        !thought
          ? res.status(404).json({
              message: 'user deleted, but no thought found',
            })
          : res.json({ message: 'User successfully deleted' })
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },

// Update a current User by ID
updateUser(req, res) {
  User.findOneAndUpdate(
    { _id: req.params.userId },
    { $set: req.body },
    { runValidators: true, new: true }
  )
    .then((user) =>
      !user
        ? res.status(404).json({ message: 'No user with this id!' })
        : res.json(user)
    )
    .catch((err) => res.status(500).json(err));
},

  // Add an thought to a user
addFriend(req, res) {
  console.log('You are adding a friend');
  console.log(req.body);
  User.findOneAndUpdate(
    { _id: req.params.userId },
    { $addToSet: { friends: req.params.friendId } },
    { new: true }
  )
    .then((user) =>
      !user
        ? res
            .status(404)
            .json({ message: 'No user found with that ID :(' })
        : res.json(user)
    )
    .catch((err) => res.status(500).json(err));
},
removeFriend(req, res) {
  User.findOneAndUpdate(
    { _id: req.params.userId },
    {$pull: { friends: req.params.friendId}},
    { new: true }
  )
    .then((user) =>
      !user
        ? res
            .status(404)
            .json({ message: 'No user found with that ID :(' })
        : res.json(user)
    )
    .catch((err) => res.status(500).json(err));
},
};

