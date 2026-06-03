import { Request, Response, NextFunction } from 'express';

export function requireAdmin(req: Request, res: Response, next: NextFunction): void {
  if (req.user?.role !== 'ADMIN') {
    res.status(403).json({ ok: false, error: 'Acceso denegado — se requiere rol ADMIN' });
    return;
  }
  next();
}
