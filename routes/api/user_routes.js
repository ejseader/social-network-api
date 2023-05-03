const router = require('express').Router();

const {
  getUsers,
  getSingleUser,
  createUser,
  updateUser,
  deleteUser,
  addFriend,
  removeFriend,
} = require('../../controllers/userController');

// /api/users
router
.route('/')
.get(getUsers)
.post(createUser);

// /api/users/:userId
router
.route('/:userId')
.get(getSingleUser)
.put(updateUser)
.delete(deleteUser);

// /api/users/:userId/friends/:friendId
router
.route('/:userId/friends/:friendId')
.put(addFriend)
.delete(removeFriend);


// const User = require('../../models/User');

// // GET All Users
// // /api/users
// router.get('/', async (req, res) => {
//   const users = await User.find().populate('thoughts', 'friends');

//   res.send(users);
// });

// // GET One User
// // /api/users/:userId
// router.get('/user', async (req, res) => {
//   const user_id = req.body.user_id;

//   const user = await User.findOne({
//     _id: user_id
// }).populate('thoughts', 'friends');

//   res.send(user);
// });

// // CREATE New User
// // /api/register
// router.post('/register', async (req, res) => {
//   const user_data = req.body;
  
//   try {
//     const user = (await User.create(user_data)).select('-__v -password');

//     res.send(user);
//   } catch (err) {
//     const errorArr = err.message.split(':');
//     console.log(errorArr[errorArr.length - 1].trim());
//   }
// });

// // ADD Friend to User's Profile
// // /api/friends/add
// router.put('friends/add', async (req, res) => {
//   const data = req.body;

//   try {
//     const updatedUser = User.findOneAndUpdate(
//       {
//         _id: data.user_id
//       },
//       {
//         $push: {
//           friends: data.friend_id
//         }
//       },
//       {
//         new: true
//       }
//     );

//     res.send(updatedUser);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

// // DELETE Friend from User's Profile
// // /api/friends/delete
// router.put('friends/delete', async (req, res) => {
//   const data = req.body;

//   try {
//     const updatedUser = User.findOneAndUpdate(
//       {
//         _id: data.user_id
//       },
//       {
//         $pull: {
//           friends: data.friend_id
//         }
//       },
//       {
//         new: true
//       }
//     );

//     res.send(updatedUser);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

module.exports = router;