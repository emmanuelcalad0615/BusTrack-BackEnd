import { z } from 'zod';

export const RegisterSchema = z.object({
  email: z.string().email('Email inválido'),
  password: z.string().min(6, 'La contraseña debe tener al menos 6 caracteres'),
  name: z.string().min(2, 'El nombre debe tener al menos 2 caracteres'),
});

export const LoginSchema = z.object({
  email: z.string().email('Email inválido'),
  password: z.string().min(1, 'La contraseña es requerida'),
});

export const ParamIdSchema = z.object({
  id: z.coerce.number().int().positive('El id debe ser un número positivo'),
});

export const RegisterAdminSchema = z.object({
  email:       z.string().email('Email inválido'),
  password:    z.string().min(6, 'La contraseña debe tener al menos 6 caracteres'),
  name:        z.string().min(2, 'El nombre debe tener al menos 2 caracteres'),
  adminSecret: z.string().min(1, 'La clave de administrador es requerida'),
});
