import { Request, Response, NextFunction } from 'express';
import SubscribeToRoute from '../../application/usecases/SubscribeToRoute';
import UnsubscribeFromRoute from '../../application/usecases/UnsubscribeFromRoute';
import GetUserSubscriptions from '../../application/usecases/GetUserSubscriptions';
import PrismaSubscriptionRepository from '../../infrastructure/db/PrismaSubscriptionRepository';

const repository          = new PrismaSubscriptionRepository();
const subscribeToRoute    = new SubscribeToRoute(repository);
const unsubscribeFromRoute = new UnsubscribeFromRoute(repository);
const getUserSubscriptions = new GetUserSubscriptions(repository);

export class SubscriptionController {

  async subscribe(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const userId  = req.user!.id;
      const { routeId } = req.body;
      const subscription = await subscribeToRoute.execute({ userId, routeId });
      res.status(201).json({ ok: true, data: subscription });
    } catch (error) {
      next(error);
    }
  }

  async unsubscribe(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      await unsubscribeFromRoute.execute(Number(req.params.id));
      res.status(200).json({ ok: true, message: 'Suscripción eliminada correctamente' });
    } catch (error) {
      next(error);
    }
  }

  async getMySubscriptions(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const userId = req.user!.id;
      const subscriptions = await getUserSubscriptions.execute(userId);
      res.status(200).json({ ok: true, data: subscriptions });
    } catch (error) {
      next(error);
    }
  }
}
