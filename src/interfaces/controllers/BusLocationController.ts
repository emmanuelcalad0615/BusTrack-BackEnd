import { Request, Response, NextFunction } from 'express';
import UpdateBusLocation from '../../application/usecases/UpdateBusLocation';
import GetBusLocation from '../../application/usecases/GetBusLocation';
import SimulateBusLocation from '../../application/usecases/SimulateBusLocation';
import PrismaBusLocationRepository from '../../infrastructure/db/PrismaBusLocationRepository';

const repository          = new PrismaBusLocationRepository();
const updateBusLocation   = new UpdateBusLocation(repository);
const getBusLocation      = new GetBusLocation(repository);
const simulateBusLocation = new SimulateBusLocation(repository);

export class BusLocationController {

  async update(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const busId    = Number(req.params.busId);
      const { latitude, longitude } = req.body;
      const location = await updateBusLocation.execute({ busId, latitude, longitude });
      res.status(200).json({ ok: true, data: location });
    } catch (error) {
      next(error);
    }
  }

  async getByBus(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const location = await getBusLocation.execute(Number(req.params.busId));
      res.status(200).json({ ok: true, data: location });
    } catch (error) {
      next(error);
    }
  }

  async simulate(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const location = await simulateBusLocation.execute(Number(req.params.busId));
      res.status(200).json({ ok: true, data: location });
    } catch (error) {
      next(error);
    }
  }
}
