import prisma from './prismaClient';
import User from '../../domain/entities/User';
import { IUserRepository } from '../../domain/repositories/IUserRepository';

export default class PrismaUserRepository implements IUserRepository {

  async save(user: User): Promise<any> {
    return prisma.user.create({
      data: {
        email:    user.email,
        password: user.password,
        name:     user.name,
      },
      select: {
        id:        true,
        email:     true,
        name:      true,
        createdAt: true,
      }
    });
  }

  async findByEmail(email: string): Promise<any> {
    return prisma.user.findUnique({
      where: { email }
    });
  }

  async findById(id: number): Promise<any> {
    return prisma.user.findUnique({
      where: { id }
    });
  }
}
