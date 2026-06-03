import Route  from "../../domain/entities/ERoute";
import { IRouteRepository } from "../../domain/repositories/IRouteRepository";

export default class FindByIdRoute {
    constructor(private readonly routeRepository: IRouteRepository) {}
    async execute(id:number): Promise<Route | null> { 
        const route = await this.routeRepository.findById(id);
        return route;
    }
}