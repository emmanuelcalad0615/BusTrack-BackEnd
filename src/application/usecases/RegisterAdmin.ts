import bcrypt from 'bcryptjs';
import User from '../../domain/entities/User';
import { IUserRepository } from '../../domain/repositories/IUserRepository';

interface RegisterAdminInput {
  email: string;
  password: string;
  name: string;
  adminSecret: string;
}

export default class RegisterAdmin {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute({ email, password, name, adminSecret }: RegisterAdminInput) {
    if (adminSecret !== process.env.ADMIN_SECRET) {
      throw new Error('Clave de administrador inválida');
    }

    const exists = await this.userRepository.findByEmail(email);
    if (exists) {
      throw new Error('Ya existe un usuario con ese email');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ email, password: hashedPassword, name, role: 'ADMIN' });
    return this.userRepository.save(user);
  }
}
