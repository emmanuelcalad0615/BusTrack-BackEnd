import { Router } from 'express';
import authRoutes from './authRoutes';
import routeRouter from './routeRouter';

const router = Router();

router.use('/auth', authRoutes);
router.use('/routes', routeRouter);

export default router;
