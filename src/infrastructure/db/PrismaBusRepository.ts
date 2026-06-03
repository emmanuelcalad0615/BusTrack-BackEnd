import prisma from './prismaClient';
import Bus from '../../domain/entities/Bus';
import { BusUpdateData, IBusRepository } from '../../domain/repositories/IBusRepository';

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
}
