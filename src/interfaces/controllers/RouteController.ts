import { Request, Response, NextFunction } from 'express';
import CreateRoute from '../../application/usecases/CreateRoute';
import UpdateRoute from '../../application/usecases/UpdateRoute';
import DeleteRoute from '../../application/usecases/DeleteRoute';
import FindRouteById from '../../application/usecases/FindRouteById';
import FindAllRoutes from '../../application/usecases/FindRouteAll';
import PrismaRouteRepository from '../../infrastructure/db/PrismaRouteRepository';

const repository =  new PrismaRouteRepository();
const createRoute = new CreateRoute(repository);
const updateRoute = new UpdateRoute(repository);
const deleteRoute = new DeleteRoute(repository);
const findRouteById = new FindRouteById(repository);
const findAllRoutes = new FindAllRoutes(repository);

export class RouteController {
    async create(req: Request, res: Response, next: NextFunction): Promise<void>{
        try{
            const route = await createRoute.execute(req.body);
            res.status(201).json({ok: true, data: route});
        }
        catch(error){
            next(error);
        }
    }
    async update(req: Request, res: Response, next: NextFunction): Promise<void>{
        try{
            const route = await updateRoute.execute({id: Number(req.params.id), data: req.body});
            res.status(200).json({ok:true, data: route});
            
        }
        catch(error){
            next(error);
        }
    }
    async findById(req: Request, res: Response, next: NextFunction): Promise<void>{
        try{
            const route = await findRouteById.execute(Number(req.params.id));
            res.status(200).json({ok:true, data: route});
        }
        catch(error){
            next(error);
        }
    }
    async findAll(req: Request, res: Response, next: NextFunction): Promise<void>{
        try{
            const routes = await findAllRoutes.execute();
            res.status(200).json({ok:true, data: routes});
        }
        catch(error){
            next(error);
        }
    }
    async delete(req: Request, res: Response, next: NextFunction): Promise<void>{
        try{
            const route = await deleteRoute.execute(Number(req.params.id));
            res.status(200).json({ok:true, data: route});
        }
        catch(error){
            next(error);
        }
    }

}
