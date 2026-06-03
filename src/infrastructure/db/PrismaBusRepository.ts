import prisma from './prismaClient';
import Bus from '../../domain/entities/Bus';
import { BusUpdateData, BusWithLocation, IBusRepository } from '../../domain/repositories/IBusRepository';

export default class PrismaBusRepository implements IBusRepository {
    async save(bus: Bus): Promise<Bus> {
        return prisma.bus.create({
            data: {
                plate: bus.plate,
                model: bus.model,
                capacity: bus.capacity,
                active: bus.active,
                routeId: bus.routeId
            }
        });
    }
    async update(id: number, data: BusUpdateData): Promise<Bus> {
        return prisma.bus.update({
            where: { id },
            data
        });
    }
    async findAll(): Promise<Bus[]> {
        return prisma.bus.findMany();
    }
    async findById(id: number): Promise<Bus | null> {
        return prisma.bus.findUnique({ where: { id } });
    }
    async delete(id: number): Promise<void> {
        await prisma.bus.delete({ where: { id } });
    }

    async findByRoutesWithLocation(routeIds: number[]): Promise<BusWithLocation[]> {
        const buses = await prisma.bus.findMany({
            where: { routeId: { in: routeIds } },
            include: { location: true },
        });
        return buses.map(b => ({
            id:       b.id,
            plate:    b.plate,
            model:    b.model,
            routeId:  b.routeId,
            location: b.location
                ? { latitude: b.location.latitude, longitude: b.location.longitude }
                : null,
        }));
    }
}
