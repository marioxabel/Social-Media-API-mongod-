import { Router } from 'express';
const router = Router();
import userRoutes from './userRoutes.js';
import thoughtRoutes from './thoughtRoutes.js';
// import reactionRoutes from './reactionRoutes.js';

router.use('/users', userRoutes);
router.use('/thoughts', thoughtRoutes);
// router.use('/rections', reactionRoutes);

export default router;
