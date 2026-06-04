import { IRouteRepository, RouteFilters } from "../../domain/repositories/IRouteRepository";

interface FindAllRoutesInput {
  page?: number;
  pageSize?: number;
  filters?: RouteFilters;
}

export default class FindAllRoutes {
  constructor(private readonly routeRepository: IRouteRepository) {}

  async execute({ page = 1, pageSize = 10, filters = {} }: FindAllRoutesInput = {}) {
    // Orquestación de paginación: traduce page/pageSize → skip/take.
    const skip = (page - 1) * pageSize;
    const { data, total } = await this.routeRepository.findAll({ skip, take: pageSize, filters });

    return { data, total, page, limit: pageSize };
  }
}
