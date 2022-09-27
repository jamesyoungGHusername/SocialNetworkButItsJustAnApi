const router = require('express').Router();
const {
   getThoughts,
   getOneThought,
   createThought,
   updateThought,
   deleteThought,
   addReaction,
   deleteReaction
  } = require('../../controllers/thoughtController');

  router.route('/').get(getThoughts).post(createThought);
  router.route('/:thoughtId').get(getOneThought).put(updateThought).delete(deleteThought);
  router.route('/api/thoughts/:thoughtId/reactions').post(addReaction).delete(deleteReaction);