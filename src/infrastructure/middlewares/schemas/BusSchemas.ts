import { z } from 'zod';

export const BusBodySchema = z.object({
    plate:    z.string().min(3, 'La placa debe tener al menos 3 caracteres'),
    model:    z.string().min(2, 'El modelo debe tener al menos 2 caracteres'),
    capacity: z.number().int().positive('La capacidad debe ser mayor a 0'),
    active:   z.boolean().optional(),
    routeId:  z.number().int().positive('El routeId debe ser un número positivo'),
});

export const ParamIdSchema = z.object({
    id: z.coerce.number().int().positive('El id debe ser un número positivo'),
});

// Query de paginación + filtros para buses.
export const BusQuerySchema = z.object({
    page:     z.coerce.number().int().positive().optional().default(1),
    pageSize: z.coerce.number().int().positive().max(100).optional().default(10),
    q:        z.string().trim().min(1).optional(),
    active:   z.enum(['true', 'false']).transform((v) => v === 'true').optional(),
    routeId:  z.coerce.number().int().positive().optional(),
});