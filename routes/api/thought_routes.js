const router = require('express').Router();

const {
  getThoughts,
  getSingleThought,
  createThought,
  updateThought,
  deleteThought,
  addReaction,
  removeReaction,
} = require('../../controllers/thoughtController');

// /api/thoughts
router.route('/')
.get(getThoughts)
.post(createThought);

// /api/thoughts/:thoughtId
router
  .route('/:id')
  .get(getSingleThought)
  .put(updateThought)
  .delete(deleteThought);

// /api/thoughts/:thoughtId/reactions
router.route('/:thoughtId/reactions')
.post(addReaction)
.delete(removeReaction);


// const Thought = require('../../models/Thought');

// // GET All Thoughts
// // /api/thoughts
// router.get('/', async (req, res) => {
//   const thoughts = await Thought.find().populate('reactions');

//   res.send(thoughts);
// });

// // GET One Thought
// // /api/thoughts/:thoughtId
// router.get('/:thoughtId', async (req, res) => {
//   const thought_id = req.params.thoughtId;

//   const thought = await Thought.findOne({
//     _id: thought_id
//   }).populate('reactions');

//   res.send(thought);
// });

// // CREATE New Thought
// // /api/thoughts/new
// router.post('/new', async (req, res) => {
//   const thought_data = req.body;

//   try {
//     const thought = (await Thought.create(thought_data)).select('-__v');

//     res.send(thought);
//   } catch (err) {
//     const errorArr = err.message.split(':');
//     console.log(errorArr[errorArr.length - 1].trim());
//   }
// });

// // UPDATE Thought
// // /api/thoughts/:thoughtId/update
// router.put('/:thoughtId/update', async (req, res) => {
//   const thought_id = req.params.thoughtId;
//   const thought_data = req.body;

//   try {
//     const updatedThought = await Thought.findOneAndUpdate(
//       {
//         _id: thought_id
//       },
//       thought_data,
//       {
//         new: true
//       }
//     );

//     res.send(updatedThought);
//   } catch (err) {
//     const errorArr = err.message.split(':');
//     console.log(errorArr[errorArr.length - 1].trim());
//   }
// });

// // DELETE Thought
// // /api/thoughts/:thoughtId/delete
// router.delete('/:thoughtId/delete', async (req, res) => {
//   const thought_id = req.params.thoughtId;

//   try {
//     const deletedThought = await Thought.findOneAndDelete({
//       _id: thought_id
//     });
    
//     res.send(deletedThought);
//   } catch (err) {
//     const errorArr = err.message.split(':');
//     console.log(errorArr[errorArr.length - 1].trim());
//   }
// });

// // ADD Reaction to Thought
// // /api/thoughts/:thoughtId/reactions/add
// router.put('/:thoughtId/reactions/add', async (req, res) => {
//   const thought_id = req.params.thoughtId;
//   const reaction_data = req.body;

//   try {
//     const updatedThought = await Thought.findOneAndUpdate(
//       {
//         _id: thought_id
//       },
//       {
//         $push: {
//           reactions: reaction_data
//         }
//       },
//       {
//         new: true
//       }
//     );

//     res.send(updatedThought);
//   } catch (err) {
//     const errorArr = err.message.split(':');
//     console.log(errorArr[errorArr.length - 1].trim());
//   }
// });

// // DELETE Reaction from Thought
// // /api/thoughts/:thoughtId/reactions/:reactionId/delete
// router.delete('/:thoughtId/reactions/:reactionId/delete', async (req, res) => {
//   const thought_id = req.params.thoughtId;
//   const reaction_id = req.params.reactionId;

//   try {
//     const updatedThought = await Thought.findOneAndUpdate(
//       {
//         _id: thought_id
//       },
//       {
//         $pull: {
//           reactions: {
//             _id: reaction_id
//           }
//         }
//       },
//       {
//         new: true
//       }
//     );

//     res.send(updatedThought);
//   } catch (err) {
//     const errorArr = err.message.split(':');
//     console.log(errorArr[errorArr.length - 1].trim());
//   }
// });

module.exports = router;