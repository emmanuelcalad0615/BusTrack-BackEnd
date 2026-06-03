import { Router } from 'express';
import { SyncController } from '../controllers/SyncController';
import { authMiddleware } from '../../infrastructure/middlewares/authMiddleware';
import { requireAdmin } from '../../infrastructure/middlewares/roleMiddleware';

const router     = Router();
const controller = new SyncController();

router.get('/routes',
  authMiddleware,
  requireAdmin,
  (req, res, next) => controller.syncRoutes(req, res, next)
);

router.post('/buses',
  authMiddleware,
  requireAdmin,
  (req, res, next) => controller.syncBuses(req, res, next)
);

export default router;
