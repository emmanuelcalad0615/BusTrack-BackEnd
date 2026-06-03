import { Router } from 'express';
import { AlertController } from '../controllers/AlertController';
import { authMiddleware } from '../../infrastructure/middlewares/authMiddleware';
import { validate } from '../../infrastructure/middlewares/validate';
import { AlertBodySchema, ParamIdSchema, ProximitySchema } from '../../infrastructure/middlewares/schemas/alertSchemas';

const router = Router();
const controller = new AlertController();

router.get('/me',
  authMiddleware,
  (req, res, next) => controller.getMyAlerts(req, res, next)
);

router.post('/',
  authMiddleware,
  validate(AlertBodySchema, 'body'),
  (req, res, next) => controller.create(req, res, next)
);

router.patch('/:id/read',
  authMiddleware,
  validate(ParamIdSchema, 'params'),
  (req, res, next) => controller.markAsRead(req, res, next)
);

router.delete('/:id',
  authMiddleware,
  validate(ParamIdSchema, 'params'),
  (req, res, next) => controller.delete(req, res, next)
);

router.post('/proximity',
  authMiddleware,
  validate(ProximitySchema, 'body'),
  (req, res, next) => controller.checkProximity(req, res, next)
);

export default router;
