import { IBusLocationRepository } from '../../domain/repositories/IBusLocationRepository';
import BusLocation from '../../domain/entities/BusLocation';

// Bounding box de Bogotá
const BOGOTA = {
  latMin: 4.48,
  latMax: 4.84,
  lngMin: -74.22,
  lngMax: -73.99,
};

function randomInRange(min: number, max: number): number {
  return Math.random() * (max - min) + min;
}

export default class SimulateBusLocation {
  constructor(private readonly busLocationRepository: IBusLocationRepository) {}

  execute(busId: number) {
    const latitude  = randomInRange(BOGOTA.latMin, BOGOTA.latMax);
    const longitude = randomInRange(BOGOTA.lngMin, BOGOTA.lngMax);

    const location = new BusLocation({ busId, latitude, longitude });
    return this.busLocationRepository.upsert(location);
  }
}
