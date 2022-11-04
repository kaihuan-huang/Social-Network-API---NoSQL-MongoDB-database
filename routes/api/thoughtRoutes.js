const router = require('express').Router();
const {
  getThoughts,
  getSingleThought,
  createThought,
  updateThought,
  deleteThought,
  addReaction,
  deleteReaction

} = require('../../controllers/thoughtController.js');

// /api/thoughts
router.route('/').get(getThoughts)

// /api/thoughts/:thoughtId
router.route('/:id').get(getSingleThought).put(updateThought).delete(deleteThought); 

// /api/thought/:userId 
router.route('/:userId').post(createThought);

// /api/thoughts/:thoughtId/reactions
router.route('/:thoughtId/reactions').post(addReaction);

// //api/thoughts/:thoughtId/reactions/reactionId
router.route('/:thoughtId/reactions/reactionId ').delete(deleteReaction);
  

module.exports = router;
