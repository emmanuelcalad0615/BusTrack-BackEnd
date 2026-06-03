import Bus from "../../domain/entities/Bus"
import { IBusRepository } from "../../domain/repositories/IBusRepository"

export default class FindBusById {
    constructor(private readonly busRepository: IBusRepository) {}
    
    execute(id: number): Promise<Bus | null> {
        return this.busRepository.findById(id);
    }
}
