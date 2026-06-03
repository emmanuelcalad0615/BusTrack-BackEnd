import { IRouteRepository } from "../../domain/repositories/IRouteRepository";

export default class FindAllRoutes {
  constructor(private readonly routeRepository: IRouteRepository) {}
   execute(): Promise<any> {
    return this.routeRepository.findAll();
  }
}
