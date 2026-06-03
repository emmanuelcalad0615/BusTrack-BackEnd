interface UserProps {
  email: string;
  password: string;
  name: string;
}

export default class User {
  email: string;
  password: string;
  name: string;

  constructor({ email, password, name }: UserProps) {
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
  }
}
