
import { IRouteRepository } from '../../domain/repositories/IRouteRepository';
import Route from '../../domain/entities/ERoute';

interface CreateRouteInput{
    name: string;
    origin: string;
    destination: string;
    active?: boolean;
}


export default class CreateRoute {
    constructor(private readonly routeRepository: IRouteRepository) {}

    async execute(input: CreateRouteInput): Promise<any> {
        const route = new Route(input);
        return await this.routeRepository.save(route);
    }
}