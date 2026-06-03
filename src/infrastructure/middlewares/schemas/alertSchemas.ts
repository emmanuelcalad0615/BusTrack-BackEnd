import { z } from 'zod';

export const AlertBodySchema = z.object({
  busId:   z.number().int().positive('El busId debe ser un número positivo'),
  message: z.string().min(2, 'El mensaje debe tener al menos 2 caracteres'),
});

export const ParamIdSchema = z.object({
  id: z.coerce.number().int().positive('El id debe ser un número positivo'),
});

export const ProximitySchema = z.object({
  latitude:        z.number().min(-90).max(90),
  longitude:       z.number().min(-180).max(180),
  thresholdMeters: z.number().positive().optional(),
});
