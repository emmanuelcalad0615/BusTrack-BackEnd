import { IRouteRepository, RouteUpdateData } from '../../domain/repositories/IRouteRepository';

interface UpdateRouteInput {
    id: number;
    data: RouteUpdateData;
}

export default class UpdateRoute {
    constructor(private readonly routeRepository: IRouteRepository) {}

    execute(input: UpdateRouteInput): Promise<any> {
        return this.routeRepository.update(input.id, input.data);
    }
}
