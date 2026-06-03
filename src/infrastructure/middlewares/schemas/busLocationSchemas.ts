import { z } from 'zod';

export const BusLocationBodySchema = z.object({
  latitude:  z.number().min(-90).max(90),
  longitude: z.number().min(-180).max(180),
});

export const ParamBusIdSchema = z.object({
  busId: z.coerce.number().int().positive('El busId debe ser un número positivo'),
});
