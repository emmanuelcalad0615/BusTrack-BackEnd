
import { IRouteRepository } from '../../domain/repositories/IRouteRepository';
import Route from '../../domain/entities/Route';

interface CreateRouteInput{
    name: string;
    origin: string;
    destination: string;
    active?: boolean;
}


export default class CreateRoute {
    constructor(private readonly routeRepository: IRouteRepository) {}

    execute(input: CreateRouteInput): Promise<any> {
        const route = new Route(input);
        return this.routeRepository.save(route);
    }
}