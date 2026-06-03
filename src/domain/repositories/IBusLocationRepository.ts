import BusLocation from '../entities/BusLocation';

export interface IBusLocationRepository {
  upsert(location: BusLocation): Promise<BusLocation>;
  findByBus(busId: number): Promise<BusLocation | null>;
}
