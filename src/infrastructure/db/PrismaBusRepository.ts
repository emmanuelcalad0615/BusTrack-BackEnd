import prisma from './prismaClient';
import Bus from '../../domain/entities/Bus';
import { BusUpdateData, BusWithLocation, IBusRepository, BusFilters } from '../../domain/repositories/IBusRepository';
import { FindAllParams, PaginatedResult } from '../../domain/repositories/Pagination';

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
    async findAll({ skip, take, filters }: FindAllParams<BusFilters>): Promise<PaginatedResult<Bus>> {
        const where: any = {};
        if (filters.active !== undefined) {
            where.active = filters.active;
        }
        if (filters.routeId !== undefined) {
            where.routeId = filters.routeId;
        }
        if (filters.q) {
            where.OR = [
                { plate: { contains: filters.q, mode: 'insensitive' } },
                { model: { contains: filters.q, mode: 'insensitive' } },
            ];
        }

        const [data, total] = await Promise.all([
            prisma.bus.findMany({ where, skip, take, orderBy: { id: 'asc' } }),
            prisma.bus.count({ where }),
        ]);

        return { data: data as Bus[], total };
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
