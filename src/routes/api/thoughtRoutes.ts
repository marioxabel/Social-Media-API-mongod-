import { Router } from 'express';
import { addReaction, addThought, deleteReaction, deleteThought, getSingleThought, getThoughts, updateThougth } from '../../controllers/thoughtController.js';


const router = Router();

// /api/thoughts
router.route('/')
    .get(getThoughts)
    .post(addThought)

// api/users/:thoughtId
router.route('/:thoughtId')
    .get(getSingleThought)
    .put(updateThougth)
    .delete(deleteThought)

// api/users/:thoughtId/reactions
router.route('/:thoughtId/reactions')
    .post(addReaction)
    .delete(deleteReaction)


export default router