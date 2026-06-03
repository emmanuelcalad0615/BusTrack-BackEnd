import { IBusRepository } from "../../domain/repositories/IBusRepository";
import Bus from "../../domain/entities/Bus";

export default class DeleteBus{
    constructor(private readonly busRepository: IBusRepository){}

    async execute(id: number): Promise<void>{
        await this.busRepository.delete(id);
    }
}