import { Request, Response, NextFunction } from 'express';
import CreateAlert from '../../application/usecases/CreateAlert';
import GetUserAlerts from '../../application/usecases/GetUserAlerts';
import MarkAlertAsRead from '../../application/usecases/MarkAlertAsRead';
import DeleteAlert from '../../application/usecases/DeleteAlert';
import PrismaAlertRepository from '../../infrastructure/db/PrismaAlertRepository';

const repository    = new PrismaAlertRepository();
const createAlert   = new CreateAlert(repository);
const getUserAlerts = new GetUserAlerts(repository);
const markAsRead    = new MarkAlertAsRead(repository);
const deleteAlert   = new DeleteAlert(repository);

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
}
