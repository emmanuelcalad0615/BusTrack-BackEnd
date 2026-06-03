import prisma from './prismaClient';
import ERoute from '../../domain/entities/ERoute';
import {IRouteRepository, RouteUpdateData} from '../../domain/repositories/IRouteRepository';

export default class PrismaRouteRepository implements IRouteRepository {

    async save(route: ERoute): Promise<any> {
        return prisma.route.create({
            data: {
                name: route.name,
                origin: route.origin,
                destination: route.destination,
                active: route.active
            }
        });
    }
    async findById(id: number): Promise<ERoute | null>{
        return prisma.route.findUnique({
            where: {id}
        })
    }
    async findAll(): Promise<ERoute[]>{
        return prisma.route.findMany();
    }
    async update(id: number, data: RouteUpdateData): Promise<ERoute> {
        return prisma.route.update({
            where: {id},
            data: {
                name: data.name,
                origin: data.origin,
                destination: data.destination,
                active: data.active
            }
        })
    }
    async delete(id: number): Promise<void> {
        await prisma.route.delete({
            where: {id}
        })
    }

    
}