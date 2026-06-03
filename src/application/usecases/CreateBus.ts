import { IBusRepository } from "../../domain/repositories/IBusRepository";
import Bus from "../../domain/entities/Bus";

interface CreateBusInput {
    plate: string;
    model: string;
    capacity: number;
    active: boolean;
    routeId: number;
}

export default class CreateBus {
    constructor(private readonly busRepository: IBusRepository) {}
    execute(input: CreateBusInput): Promise<Bus> {
        const bus = new Bus(input);
        return this.busRepository.save(bus);
    }
}