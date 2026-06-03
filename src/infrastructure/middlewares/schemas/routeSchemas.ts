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
