import { Request, Response, NextFunction } from 'express';
import SyncRoutesFromOSM from '../../application/usecases/SyncRoutesFromOSM';
import SeedBuses from '../../application/usecases/SeedBuses';
import PrismaRouteRepository from '../../infrastructure/db/prismaRouteRepository';
import PrismaBusRepository from '../../infrastructure/db/PrismaBusRepository';

const routeRepository   = new PrismaRouteRepository();
const busRepository     = new PrismaBusRepository();
const syncRoutesFromOSM = new SyncRoutesFromOSM(routeRepository);
const seedBuses         = new SeedBuses(routeRepository, busRepository);

export class SyncController {

  async syncRoutes(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const result = await syncRoutesFromOSM.execute();
      res.status(200).json({ ok: true, data: result });
    } catch (error) {
      next(error);
    }
  }

  async syncBuses(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const busesPerRoute = Number(req.query.busesPerRoute) || 2;
      const result = await seedBuses.execute(busesPerRoute);
      res.status(200).json({ ok: true, data: result });
    } catch (error) {
      next(error);
    }
  }
}
