interface RouteProps{
    name: string;
    origin: string;
    destination: string;
    active?: boolean;
}

export default class Route {
    id?: number;
    name: string;
    origin: string;
    destination: string;
    active?: boolean;

    constructor({name, origin, destination, active = true}: RouteProps) {
        if (!name || name.trim().length < 2) {
            throw new Error('El nombre de la ruta debe tener al menos 2 caracteres');
        }
        if (!origin || origin.trim().length < 2) {
            throw new Error('El origen de la ruta debe tener al menos 2 caracteres');
        }
        if (!destination || destination.trim().length < 2) {
            throw new Error('El destino de la ruta debe tener al menos 2 caracteres');
        }



        this.name = name.trim();
        this.origin = origin.trim();
        this.destination = destination.trim();
        this.active = active;
    }
}
    