import Bus from "../entities/Bus";
export interface BusUpdateData {
    plate?: string;
    model?: string;
    capacity?: number;
    active?: boolean;
    routeId?: number;
}

export interface IBusRepository {
    save(bus: Bus): Promise<Bus>;
    findById(id: number): Promise<Bus | null>;
    findAll(): Promise<Bus[]>;
    update(id: number, data: BusUpdateData): Promise<Bus>;
    delete(id: number): Promise<void>;
    
}