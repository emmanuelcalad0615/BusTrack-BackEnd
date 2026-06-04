import { z } from 'zod';

export const RouteBodySchema = z.object({
  name:        z.string().min(2, 'El nombre debe tener al menos 2 caracteres'),
  origin:      z.string().min(2, 'El origen debe tener al menos 2 caracteres'),
  destination: z.string().min(2, 'El destino debe tener al menos 2 caracteres'),
  active:      z.boolean().optional(),
});

export const ParamIdSchema = z.object({
  id: z.coerce.number().int().positive('El id debe ser un número positivo'),
});

// Query de paginación + filtros. Los valores de query llegan como string;
// z.coerce convierte números. Para boolean NO usamos z.coerce.boolean()
// (trataría 'false' como true) — mapeamos el enum 'true'/'false' a mano.
export const RouteQuerySchema = z.object({
  page:     z.coerce.number().int().positive().optional().default(1),
  pageSize: z.coerce.number().int().positive().max(100).optional().default(10),
  q:        z.string().trim().min(1).optional(),
  active:   z.enum(['true', 'false']).transform((v) => v === 'true').optional(),
});
