import { Router } from 'express';
import authRoutes from './authRoutes';
import routeRouter from './routeRouter';
import busRouter from './busRouter';
import subscriptionRouter from './subscriptionRouter';
import busLocationRouter from './busLocationRouter';
import alertRouter from './alertRouter';
import syncRouter from './syncRouter';

const router = Router();

router.use('/auth', authRoutes);
router.use('/routes', routeRouter);
router.use('/buses', busRouter);
router.use('/subscriptions', subscriptionRouter);
router.use('/locations', busLocationRouter);
router.use('/alerts', alertRouter);
router.use('/sync', syncRouter);

export default router;
