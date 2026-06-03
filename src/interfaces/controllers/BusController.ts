import { Request, Response, NextFunction } from 'express';
import CreateBus from '../../application/usecases/CreateBus';
import UpdateBus from '../../application/usecases/UpdateBus';
import DeleteBus from '../../application/usecases/DeleteBus';
import FindBusById from '../../application/usecases/FindBusById';
import FindBusAll from '../../application/usecases/FindBusAll';
import PrismaBusRepository from '../../infrastructure/db/PrismaBusRepository';

const repository   = new PrismaBusRepository();
const createBus    = new CreateBus(repository);
const updateBus    = new UpdateBus(repository);
const deleteBus    = new DeleteBus(repository);
const findBusById  = new FindBusById(repository);
const findAllBuses = new FindBusAll(repository);

export class BusController {

    async create(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const bus = await createBus.execute(req.body);
            res.status(201).json({ ok: true, data: bus });
        } catch (error) {
            next(error);
        }
    }

    async findAll(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const buses = await findAllBuses.execute();
            res.status(200).json({ ok: true, data: buses });
        } catch (error) {
            next(error);
        }
    }

    async findById(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const bus = await findBusById.execute(Number(req.params.id));
            res.status(200).json({ ok: true, data: bus });
        } catch (error) {
            next(error);
        }
    }

    async update(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const bus = await updateBus.execute({ id: Number(req.params.id), data: req.body });
            res.status(200).json({ ok: true, data: bus });
        } catch (error) {
            next(error);
        }
    }

    async delete(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            await deleteBus.execute(Number(req.params.id));
            res.status(200).json({ ok: true, message: 'Bus eliminado correctamente' });
        } catch (error) {
            next(error);
        }
    }
}
