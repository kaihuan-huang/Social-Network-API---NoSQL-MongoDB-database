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

// /api/thought
router.route('/').get(getThoughts)

// /api/thought/:thoughtId
router.route('/:id').get(getSingleThought).put(updateThought).delete(deleteThought); 

// /api/thought/:userId 
router.route('/:userId').post(createThought);

// /api/thought/:thoughtId/reactions
router.route('/:thoughtId/reactions').post(addReaction);

// //api/thoughts/:thoughtId/reactions/reactionId
router.route('/:thoughtId/reactions/reactionId ').delete(deleteReaction);
  

module.exports = router;
