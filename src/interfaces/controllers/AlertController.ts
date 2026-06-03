import { Request, Response, NextFunction } from 'express';
import CreateAlert from '../../application/usecases/CreateAlert';
import GetUserAlerts from '../../application/usecases/GetUserAlerts';
import MarkAlertAsRead from '../../application/usecases/MarkAlertAsRead';
import DeleteAlert from '../../application/usecases/DeleteAlert';
import CheckProximityAlerts from '../../application/usecases/CheckProximityAlerts';
import PrismaAlertRepository from '../../infrastructure/db/PrismaAlertRepository';
import PrismaSubscriptionRepository from '../../infrastructure/db/PrismaSubscriptionRepository';
import PrismaBusRepository from '../../infrastructure/db/PrismaBusRepository';

const alertRepo        = new PrismaAlertRepository();
const subscriptionRepo = new PrismaSubscriptionRepository();
const busRepo          = new PrismaBusRepository();

const createAlert          = new CreateAlert(alertRepo);
const getUserAlerts        = new GetUserAlerts(alertRepo);
const markAsRead           = new MarkAlertAsRead(alertRepo);
const deleteAlert          = new DeleteAlert(alertRepo);
const checkProximityAlerts = new CheckProximityAlerts(subscriptionRepo, busRepo, alertRepo);

export class AlertController {

  async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const userId = req.user!.id;
      const { busId, message } = req.body;
      const alert = await createAlert.execute({ userId, busId, message });
      res.status(201).json({ ok: true, data: alert });
    } catch (error) {
      next(error);
    }
  }

  async getMyAlerts(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const userId = req.user!.id;
      const alerts = await getUserAlerts.execute(userId);
      res.status(200).json({ ok: true, data: alerts });
    } catch (error) {
      next(error);
    }
  }

  async markAsRead(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const alert = await markAsRead.execute(Number(req.params.id));
      res.status(200).json({ ok: true, data: alert });
    } catch (error) {
      next(error);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      await deleteAlert.execute(Number(req.params.id));
      res.status(200).json({ ok: true, message: 'Alerta eliminada correctamente' });
    } catch (error) {
      next(error);
    }
  }

  async checkProximity(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const userId = req.user!.id;
      const { latitude, longitude, thresholdMeters } = req.body;
      const result = await checkProximityAlerts.execute({
        userId,
        latitude,
        longitude,
        thresholdMeters: thresholdMeters ?? 500,
      });
      res.status(200).json({ ok: true, data: result });
    } catch (error) {
      next(error);
    }
  }
}
