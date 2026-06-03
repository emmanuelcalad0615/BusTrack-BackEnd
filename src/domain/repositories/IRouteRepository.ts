import Route from "../entities/Route";

export interface RouteUpdateData {
  name?: string;
  origin?: string;
  destination?: string;
  active?: boolean;
}

export interface IRouteRepository {
  save(route: Route): Promise<Route>;
  findById(id: number): Promise<Route | null>;
  findAll(): Promise<Route[]>;
  update(id: number, data: RouteUpdateData): Promise<Route>;
  delete(id: number): Promise<void>;
}