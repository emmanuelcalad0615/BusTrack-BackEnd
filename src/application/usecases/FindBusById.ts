import Bus from "../../domain/entities/Bus"
import { IBusRepository } from "../../domain/repositories/IBusRepository"

export default class FindBusById {
    constructor(private readonly busRepository: IBusRepository) {}

    async execute(id: number): Promise<Bus> {
        const bus = await this.busRepository.findById(id);
        if (!bus) {
            throw new Error('Bus no encontrado'); // errorHandler lo mapea a 404
        }
        return bus;
    }
}
