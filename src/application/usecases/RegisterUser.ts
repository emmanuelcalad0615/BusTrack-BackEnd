import bcrypt from 'bcryptjs';
import User from '../../domain/entities/User';
import { IUserRepository } from '../../domain/repositories/IUserRepository';

interface RegisterUserInput {
  email: string;
  password: string;
  name: string;
}

export default class RegisterUser {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute({ email, password, name }: RegisterUserInput): Promise<User> {
    const exists = await this.userRepository.findByEmail(email);
    if (exists) {
      throw new Error('Ya existe un usuario con ese email');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({ email, password: hashedPassword, name });

    return this.userRepository.save(user);
  }
}
