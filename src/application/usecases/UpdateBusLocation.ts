import BusLocation from '../../domain/entities/BusLocation';
import { IBusLocationRepository } from '../../domain/repositories/IBusLocationRepository';

interface UpdateBusLocationInput {
  busId: number;
  latitude: number;
  longitude: number;
}

export default class UpdateBusLocation {
  constructor(private readonly busLocationRepository: IBusLocationRepository) {}

  execute({ busId, latitude, longitude }: UpdateBusLocationInput) {
    const location = new BusLocation({ busId, latitude, longitude });
    return this.busLocationRepository.upsert(location);
  }
}
