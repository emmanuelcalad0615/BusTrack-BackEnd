import Route  from "../../domain/entities/Route";
import { IRouteRepository } from "../../domain/repositories/IRouteRepository";

export default class FindByIdRoute {
    constructor(private readonly routeRepository: IRouteRepository) {}
    async execute(id: number): Promise<Route> {
        const route = await this.routeRepository.findById(id);
        if (!route) {
            throw new Error('Ruta no encontrada'); // errorHandler lo mapea a 404
        }
        return route;
    }
}