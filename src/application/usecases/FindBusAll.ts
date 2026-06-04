import { IBusRepository, BusFilters } from "../../domain/repositories/IBusRepository";

interface FindAllBusesInput {
    page?: number;
    pageSize?: number;
    filters?: BusFilters;
}

export default class FindAllBuses {
    constructor(private readonly busRepository: IBusRepository) {}

    async execute({ page = 1, pageSize = 10, filters = {} }: FindAllBusesInput = {}) {
        const skip = (page - 1) * pageSize;
        const { data, total } = await this.busRepository.findAll({ skip, take: pageSize, filters });

        return { data, total, page, limit: pageSize };
    }
}
