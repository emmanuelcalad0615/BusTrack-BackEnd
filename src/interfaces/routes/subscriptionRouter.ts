import { Router } from 'express';
import { SubscriptionController } from '../controllers/SubscriptionController';
import { authMiddleware } from '../../infrastructure/middlewares/authMiddleware';
import { validate } from '../../infrastructure/middlewares/validate';
import { SubscriptionBodySchema, ParamIdSchema } from '../../infrastructure/middlewares/schemas/subscriptionSchemas';

const router = Router();
const controller = new SubscriptionController();

router.get('/me',
  authMiddleware,
  (req, res, next) => controller.getMySubscriptions(req, res, next)
);

router.post('/',
  authMiddleware,
  validate(SubscriptionBodySchema, 'body'),
  (req, res, next) => controller.subscribe(req, res, next)
);

router.delete('/:id',
  authMiddleware,
  validate(ParamIdSchema, 'params'),
  (req, res, next) => controller.unsubscribe(req, res, next)
);

export default router;
