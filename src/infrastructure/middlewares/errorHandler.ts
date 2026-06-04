import { Request, Response, NextFunction } from 'express';

export const errorHandler = (
  error: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
): void => {
  console.error('[ERROR]', error.message);

  // Errores conocidos del ORM (Prisma) que SON culpa de la solicitud → 4xx.
  // Solo P2xxx (validación de la query). Errores de conexión (P1xxx) u otros
  // caen al 500 genérico de abajo, porque no son culpa del cliente.
  const prismaCode = (error as { code?: string }).code;
  if (prismaCode === 'P2002') { // restricción única violada
    res.status(409).json({ ok: false, error: 'El registro ya existe (valor único duplicado)' });
    return;
  }
  if (prismaCode === 'P2003') { // llave foránea violada
    res.status(400).json({ ok: false, error: 'Referencia inválida: el recurso relacionado no existe' });
    return;
  }
  if (prismaCode === 'P2025') { // registro a actualizar/eliminar no encontrado
    res.status(404).json({ ok: false, error: 'Recurso no encontrado' });
    return;
  }

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
