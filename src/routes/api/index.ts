import { Router } from 'express';
const router = Router();
import userRoutes from './userRoutes.js';
// import postRoutes from './postRoutes.js';
// import reactionRoutes from './reactionRoutes.js';

router.use('/users', userRoutes);
// router.use('/posts', postRoutes);
// router.use('/rections', reactionRoutes);

export default router;
