import Bus from "../entities/Bus";
import { FindAllParams, PaginatedResult } from "./Pagination";

export interface BusUpdateData {
    plate?: string;
    model?: string;
    capacity?: number;
    active?: boolean;
    routeId?: number;
}

// Filtros propios de Bus: texto (placa/modelo), estado y ruta.
export interface BusFilters {
    q?: string;
    active?: boolean;
    routeId?: number;
}

export interface BusWithLocation {
  id: number;
  plate: string;
  model: string;
  routeId: number;
  location: { latitude: number; longitude: number } | null;
}

export interface IBusRepository {
    save(bus: Bus): Promise<Bus>;
    findById(id: number): Promise<Bus | null>;
    findAll(params: FindAllParams<BusFilters>): Promise<PaginatedResult<Bus>>;
    update(id: number, data: BusUpdateData): Promise<Bus>;
    delete(id: number): Promise<void>;
    findByRoutesWithLocation(routeIds: number[]): Promise<BusWithLocation[]>;
}
