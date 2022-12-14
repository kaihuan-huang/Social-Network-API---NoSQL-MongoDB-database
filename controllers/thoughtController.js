const { Thought, User } = require('../models');

// Aggregate function to get the number of friends overall
const reactionCount = async () =>
  Thought.aggregate()
    .count('reactionCount')
    .then((numberOfReactions) => numberOfReactions);

module.exports = {
  // Get all thoughts
  getThoughts(req, res) {
    Thought.find()
      .then(async (thoughts) => {
        const thoughtObj = {
          thoughts,
          reacionCount: await reactionCount,
        };
        return res.json(thoughtObj);
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
  // getThoughts(req, res) {
  //   Thought.find({})
  //     .populate({path: 'reactions', select: '-__v'})
  //     .select('-__v')
  //     .then((thoughts) => res.json(thoughts))
  //     .catch((err) => {
  //       console.log(err);
  //       res.status(500).json(err)
  //     });
  // },
  // Get a thought by id
  getSingleThought(req, res) {
    Thought.findOne({ _id: req.params.thoughtId })
      // .populate({path: 'reactions', select: '-__v'})
      .select('-__v')
      .then(async(thought) =>
        !thought
          ? res.status(404).json({ message: 'No thought with that ID' })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },
  /*Create a thought
  POST to create a new thought (don't forget to push the created thought's _id to the associated user's thoughts array field)
{
  "thoughtText": "Here's a cool thought...",
  "username": "lernantino",
  "userId": "5edff358a0fcb779aa7b118b"
}
  */
createThought(req, res) {
  Thought.create(req.body)
    .then((thought) => {
      return User.findOneAndUpdate(
        { _id: req.params.userId },
        { $push: { thoughts: thought._id } },
        { new: true }
      );
    })
    .then((dbUserData) => {
      if (!dbUserData) {
        return res.status(404).json({ message: 'Thought created but no user with this id!' });
      }

      res.json({ message: 'Thought successfully created!' });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
},
 
  deleteThought(req, res) {
    Thought.findOneAndDelete({ _id: req.params.thoughtId })
      .then((thought) => {
          if (!thought){
            return res.status(404).json({ message: 'No thought with that ID' })

          }
          return User.findOneAndUpdate(
            { thoughts: req.params.thoughtId },
            { $pull: { thoughts: req.params.thoughtId } },
            { new: true }
          );
          })
      .then((dbUser) => {
        if(!dbUser){
          res.json({ message: 'thoughts have no user' })
        }
        res.json({ message: 'thoughts deleted' })})
      .catch((err) => res.status(500).json(err));
  },

  // Update a thought
  updateThought(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: 'No thought with this id!' })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },
  // Add a reaction to a thought
addReaction(req, res) {
  console.log('You are adding a reacion');
  console.log(req.body);
  Thought.findOneAndUpdate(
    { _id: req.params.thoughtId },
    { $addToSet: { reactions: req.body } },
    { new: true }
  )
    .then((thought) =>
      !thought
        ? res
            .status(404)
            .json({ message: 'No thought found with that ID :(' })
        : res.json(thought)
    )
    .catch((err) => res.status(500).json(err));
},
deleteReaction(req, res) {
  console.log('thought',res)
  Thought.findOneAndUpdate(
    { _id: req.params.thoughtId },
    { $pull: { reactions: { reactionId: req.params.reactionId } } },
    { runValidators: true, new: true }
  )
    .then((thought) =>
      !thought
        ? res
            .status(404)
            .json({ message: 'No reaction found with that ID :(' })
        : res.json(thought)
    )
    .catch((err) => res.status(500).json(err));
},
};
