import { IBusLocationRepository } from '../../domain/repositories/IBusLocationRepository';

export default class GetBusLocation {
  constructor(private readonly busLocationRepository: IBusLocationRepository) {}

  execute(busId: number) {
    return this.busLocationRepository.findByBus(busId);
  }
}
