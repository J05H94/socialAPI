const router = require('express').Router();
const {
  getUsers,
  getSingleUser,
  createUser,
  // updateUser,
  deleteUser,
  // addFriend,
} = require('../../controllers/userController');

// /api/users
router.route('/').get(getUsers).post(createUser);

// /api/users/:userId
router.route('/:userId').get(getSingleUser).delete(deleteUser);
//.put(updateUser)
// /api/users/:userId friendId
// router.route('/:userId friendId').get(addFriend)

module.exports = router;