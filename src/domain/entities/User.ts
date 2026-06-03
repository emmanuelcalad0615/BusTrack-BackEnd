export type UserRole = 'USER' | 'ADMIN';

interface UserProps {
  email: string;
  password: string;
  name: string;
  role?: UserRole;
}

export default class User {
  id?: number;
  email: string;
  password: string;
  name: string;
  role: UserRole;

  constructor({ email, password, name, role = 'USER' }: UserProps) {
    if (!email || !email.includes('@')) {
      throw new Error('El email es inválido');
    }
    if (!password || password.length < 6) {
      throw new Error('La contraseña debe tener al menos 6 caracteres');
    }
    if (!name || name.trim().length < 2) {
      throw new Error('El nombre debe tener al menos 2 caracteres');
    }

    this.email    = email.toLowerCase().trim();
    this.password = password;
    this.name     = name.trim();
    this.role     = role;
  }
}
