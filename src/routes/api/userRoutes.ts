import { Router } from 'express';
import { addFriend, addUser, deleteFriend, deleteUser, getSingleUser, getUsers, updateUser } from '../../controllers/userController.js';

const router = Router();

// /api/users
router.route('/')
    .get(getUsers)
    .post(addUser)

// api/users/:userId
router.route('/:userId')
    .get(getSingleUser)
    .put(updateUser)
    .delete(deleteUser)

// api/users/:userId/friends/:friendId
router.route('/:userId/friends/:friendId')
    .post(addFriend)
    .delete(deleteFriend)


export default router