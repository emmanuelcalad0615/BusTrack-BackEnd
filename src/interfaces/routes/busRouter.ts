import { Router } from 'express';
import { BusController } from '../controllers/BusController';
import { validate } from '../../infrastructure/middlewares/validate';
import { authMiddleware } from '../../infrastructure/middlewares/authMiddleware';
import { BusBodySchema, ParamIdSchema, BusQuerySchema } from '../../infrastructure/middlewares/schemas/BusSchemas';

const router = Router();
const controller = new BusController();

router.get('/',
    authMiddleware,
    validate(BusQuerySchema, 'query'),
    (req, res, next) => controller.findAll(req, res, next)
);

router.get('/:id',
    authMiddleware,
    validate(ParamIdSchema, 'params'),
    (req, res, next) => controller.findById(req, res, next)
);

router.post('/',
    authMiddleware,
    validate(BusBodySchema, 'body'),
    (req, res, next) => controller.create(req, res, next)
);

router.put('/:id',
    authMiddleware,
    validate(ParamIdSchema, 'params'),
    validate(BusBodySchema.partial(), 'body'),
    (req, res, next) => controller.update(req, res, next)
);

router.delete('/:id',
    authMiddleware,
    validate(ParamIdSchema, 'params'),
    (req, res, next) => controller.delete(req, res, next)
);

export default router;
