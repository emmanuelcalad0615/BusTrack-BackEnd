import { Request, Response, NextFunction } from 'express';
import { ZodSchema } from 'zod';

export function validate(schema: ZodSchema, source: 'body' | 'params' | 'query') {
  return (req: Request, res: Response, next: NextFunction): void => {
    const result = schema.safeParse(req[source]);
    if (!result.success) {
      res.status(400).json({
        ok: false,
        error: 'Datos inválidos',
        details: result.error.flatten().fieldErrors
      });
      return;
    }
    req[source] = result.data;
    next();
  };
}
