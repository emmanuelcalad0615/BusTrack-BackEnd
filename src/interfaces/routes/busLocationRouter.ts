import { Router } from 'express';
import { BusLocationController } from '../controllers/BusLocationController';
import { authMiddleware } from '../../infrastructure/middlewares/authMiddleware';
import { validate } from '../../infrastructure/middlewares/validate';
import { BusLocationBodySchema, ParamBusIdSchema } from '../../infrastructure/middlewares/schemas/busLocationSchemas';

const router = Router();
const controller = new BusLocationController();

router.get('/:busId',
  authMiddleware,
  validate(ParamBusIdSchema, 'params'),
  (req, res, next) => controller.getByBus(req, res, next)
);

router.post('/:busId',
  authMiddleware,
  validate(ParamBusIdSchema, 'params'),
  validate(BusLocationBodySchema, 'body'),
  (req, res, next) => controller.update(req, res, next)
);

router.post('/:busId/simulate',
  authMiddleware,
  validate(ParamBusIdSchema, 'params'),
  (req, res, next) => controller.simulate(req, res, next)
);

export default router;
