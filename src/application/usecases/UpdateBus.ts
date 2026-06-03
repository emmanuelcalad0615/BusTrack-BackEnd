import { IBusRepository, BusUpdateData } from "../../domain/repositories/IBusRepository";
import Bus from "../../domain/entities/Bus";

interface UpdateBusInput {
    id: number;
    data: BusUpdateData;

}

export default class UpdateBus {
    constructor(private readonly BusRepository: IBusRepository) {}
    
    execute(input: UpdateBusInput): Promise<Bus> {
        return this.BusRepository.update(input.id, input.data);
    }
}
