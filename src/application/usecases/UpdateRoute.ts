import { IRouteRepository, RouteUpdateData } from '../../domain/repositories/IRouteRepository';

interface UpdateRouteInput {
    id: number;
    data: RouteUpdateData;
}

export default class UpdateRoute {
    constructor(private readonly routeRepository: IRouteRepository) {}

    async execute(input: UpdateRouteInput): Promise<any> {
        
        const route = await this.routeRepository.update(input.id, input.data);
        return route;
    }
}
