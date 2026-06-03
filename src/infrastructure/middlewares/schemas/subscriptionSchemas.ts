import { z } from 'zod';

export const SubscriptionBodySchema = z.object({
  routeId: z.number().int().positive('El routeId debe ser un número positivo'),
});

export const ParamIdSchema = z.object({
  id: z.coerce.number().int().positive('El id debe ser un número positivo'),
});
