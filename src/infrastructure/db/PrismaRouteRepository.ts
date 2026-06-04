import prisma from './prismaClient';
import ERoute from '../../domain/entities/Route';
import {IRouteRepository, RouteUpdateData, RouteFilters} from '../../domain/repositories/IRouteRepository';
import { FindAllParams, PaginatedResult } from '../../domain/repositories/Pagination';

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
    async findAll({ skip, take, filters }: FindAllParams<RouteFilters>): Promise<PaginatedResult<ERoute>> {
        // Construye el WHERE dinámico segun los filtros recibidos.
        const where: any = {};
        if (filters.active !== undefined) {
            where.active = filters.active;
        }
        if (filters.q) {
            // Busca el texto en nombre, origen o destino (case-insensitive).
            where.OR = [
                { name:        { contains: filters.q, mode: 'insensitive' } },
                { origin:      { contains: filters.q, mode: 'insensitive' } },
                { destination: { contains: filters.q, mode: 'insensitive' } },
            ];
        }

        // findMany (página) + count (total) en paralelo: una sola ida a la DB lógica.
        const [data, total] = await Promise.all([
            prisma.route.findMany({ where, skip, take, orderBy: { id: 'asc' } }),
            prisma.route.count({ where }),
        ]);

        return { data: data as ERoute[], total };
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