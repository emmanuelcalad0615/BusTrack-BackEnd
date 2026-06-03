import { IRouteRepository } from '../../domain/repositories/IRouteRepository';

export default class DeleteRoute {
    constructor(private readonly routeRepository: IRouteRepository) {}

    async execute(id: number): Promise<void> {
        await this.routeRepository.delete(id);
    }
}