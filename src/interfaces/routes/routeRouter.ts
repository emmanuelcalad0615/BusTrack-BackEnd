import {Router} from "express";
import { RouteController } from "../controllers/RouteController";
import { validate } from '../../infrastructure/middlewares/validate';
import { RouteBodySchema, ParamIdSchema } from '../../infrastructure/middlewares/schemas/routeSchemas';
import {authMiddleware} from '../../infrastructure/middlewares/authMiddleware';

const router = Router();
const controller = new RouteController();

router.get('/', authMiddleware, (req, res, next) => controller.findAll(req, res, next));
router.get('/:id', authMiddleware, validate(ParamIdSchema, 'params'), (req, res, next) => controller.findById(req, res, next));
router.post('/', authMiddleware,validate(RouteBodySchema, 'body'), (req, res, next) => controller.create(req, res, next));
router.put('/:id', authMiddleware, validate(RouteBodySchema.partial(), 'body'), validate(ParamIdSchema, 'params'), (req, res, next) => controller.update(req, res, next));
router.delete('/:id', authMiddleware, validate(ParamIdSchema, 'params'), (req, res, next) => controller.delete(req, res, next));

export default router;
