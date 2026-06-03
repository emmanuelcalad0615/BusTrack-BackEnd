interface BusProps{
    plate: string;
    model: string;
    capacity: number;
    active?: boolean;
    routeId:number;
}

export default class Bus {
    plate: string;
    model: string;
    capacity: number;
    active: boolean;
    routeId: number;
    
    constructor({plate, model, capacity, routeId, active = true}: BusProps) {
        if (!plate || plate.trim().length < 2) {
            throw new Error('La placa del bus debe tener al menos 2 caracteres');
        }
        if (!model || model.trim().length < 2) {
            throw new Error('El modelo del bus debe tener al menos 2 caracteres');
        }
        if (!capacity || capacity < 1) {
            throw new Error('La capacidad del bus debe ser mayor a 0');
        }
        if (!routeId || routeId < 1) {
            throw new Error('La ruta del bus debe ser mayor a 0');
        }
        
        this.plate = plate.trim();
        this.model = model.trim();
        this.capacity = capacity;
        this.active = active;
        this.routeId = routeId;
    }
    
    
}