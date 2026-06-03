import Bus from "../entities/Bus";
export interface BusUpdateData {
    plate?: string;
    model?: string;
    capacity?: number;
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
    findAll(): Promise<Bus[]>;
    update(id: number, data: BusUpdateData): Promise<Bus>;
    delete(id: number): Promise<void>;
    findByRoutesWithLocation(routeIds: number[]): Promise<BusWithLocation[]>;
}