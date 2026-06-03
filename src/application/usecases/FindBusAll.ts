import { IBusRepository } from "../../domain/repositories/IBusRepository";
import Bus from "../../domain/entities/Bus";
export default class FindAllBuses {
    constructor(private readonly busRepository: IBusRepository) {}

    execute(): Promise<Bus[]> {
        return this.busRepository.findAll();
    }
}