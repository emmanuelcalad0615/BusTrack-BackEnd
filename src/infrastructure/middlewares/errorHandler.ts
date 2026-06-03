import { Request, Response, NextFunction } from 'express';

export const errorHandler = (
  error: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
): void => {
  console.error('[ERROR]', error.message);

  const errorMap: Record<string, number> = {
    'Ya existe un usuario con ese email': 400,
    'Ya estás suscrito a esta ruta': 400,
    'Clave de administrador inválida': 403,
    'Credenciales inválidas': 401,
    'Token inválido o expirado': 401,
    'No autorizado': 401,
    'Usuario no encontrado': 404,
    'Bus no encontrado': 404,
    'Ruta no encontrada': 404,
    'Suscripción no encontrada': 404,
    'Alerta no encontrada': 404,
    'Ubicación no encontrada': 404,
  };

  const status = errorMap[error.message] ?? 500;
  const errorMessage = status === 500 ? 'Error interno del servidor' : error.message;

  res.status(status).json({ ok: false, error: errorMessage });
};
