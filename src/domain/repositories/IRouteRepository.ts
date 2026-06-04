import Route from "../entities/Route";
import { FindAllParams, PaginatedResult } from "./Pagination";

export interface RouteUpdateData {
  name?: string;
  origin?: string;
  destination?: string;
  active?: boolean;
}

// Filtros propios de Route: búsqueda de texto y estado activo/inactivo.
export interface RouteFilters {
  q?: string;
  active?: boolean;
}

export interface IRouteRepository {
  save(route: Route): Promise<Route>;
  findById(id: number): Promise<Route | null>;
  findAll(params: FindAllParams<RouteFilters>): Promise<PaginatedResult<Route>>;
  update(id: number, data: RouteUpdateData): Promise<Route>;
  delete(id: number): Promise<void>;
}
