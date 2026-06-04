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
    // En Express 5, req.query es un getter sin setter → reasignarlo tira
    // "Cannot set property query of #<IncomingMessage> which has only a getter".
    // Redefinimos la propiedad con los datos ya validados/coercionados.
    if (source === 'query') {
      Object.defineProperty(req, 'query', { value: result.data, writable: true, configurable: true });
    } else {
      req[source] = result.data;
    }
    next();
  };
}
