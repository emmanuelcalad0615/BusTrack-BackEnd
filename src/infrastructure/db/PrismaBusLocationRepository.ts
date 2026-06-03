import prisma from './prismaClient';
import BusLocation from '../../domain/entities/BusLocation';
import { IBusLocationRepository } from '../../domain/repositories/IBusLocationRepository';

export default class PrismaBusLocationRepository implements IBusLocationRepository {

  upsert(location: BusLocation): Promise<any> {
    return prisma.busLocation.upsert({
      where:  { busId: location.busId },
      update: { latitude: location.latitude, longitude: location.longitude },
      create: { busId: location.busId, latitude: location.latitude, longitude: location.longitude },
    });
  }

  findByBus(busId: number): Promise<any> {
    return prisma.busLocation.findUnique({ where: { busId } });
  }
}
