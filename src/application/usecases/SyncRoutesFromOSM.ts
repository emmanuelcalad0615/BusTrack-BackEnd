import GTFSService from '../../infrastructure/gtfs/GTFSService';
import { IRouteRepository } from '../../domain/repositories/IRouteRepository';
import Route from '../../domain/entities/Route';

export default class SyncRoutesFromOSM {
  private readonly gtfsService = new GTFSService();

  constructor(private readonly routeRepository: IRouteRepository) {}

  async execute(): Promise<{ synced: number; failed: number }> {
    const gtfsRoutes = await this.gtfsService.getRoutes();

    let synced = 0;
    let failed = 0;

    for (const r of gtfsRoutes) {
      try {
        const route = new Route({
          name:        r.name,
          origin:      r.origin,
          destination: r.destination,
        });
        await this.routeRepository.save(route);
        synced++;
      } catch {
        failed++;
      }
    }

    return { synced, failed };
  }
}
