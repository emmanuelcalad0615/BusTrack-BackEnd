import Route  from "../../domain/entities/Route";
import { IRouteRepository } from "../../domain/repositories/IRouteRepository";

export default class FindByIdRoute {
    constructor(private readonly routeRepository: IRouteRepository) {}
    execute(id: number): Promise<Route | null> {
        return this.routeRepository.findById(id);
    }
}