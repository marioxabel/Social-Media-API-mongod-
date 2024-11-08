import { Router } from 'express';
import { addUser, deleteUser, getSingleUser, getUsers, updateUser } from '../../controllers/userController.js';

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


export default router