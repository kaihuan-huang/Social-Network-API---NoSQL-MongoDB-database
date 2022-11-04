const router = require('express').Router();
const {
  getUsers,
  getSingleUser,
  // updateUser,
  addFriend,
  createUser,
  deleteUser,
  // addThought,
  // removeThought,
  removeFriend,
} = require('../../controllers/userController');

// /api/users
router.route('/').get(getUsers).post(createUser);

// /api/users/:userId
router.route('/:userId').get(getSingleUser).delete(deleteUser);

// /api/users/:userId/thoughts
// router.route('/:userId/thoughts').post(addThought);

// /api/users/:userId/thoughts/:thoughtId
router.route('/:userId/friends/:friendId').post(addFriend).delete(removeFriend);

module.exports = router;
