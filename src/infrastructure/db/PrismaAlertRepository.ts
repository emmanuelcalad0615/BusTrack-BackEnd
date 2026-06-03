import prisma from './prismaClient';
import Alert from '../../domain/entities/Alert';
import { IAlertRepository } from '../../domain/repositories/IAlertRepository';

export default class PrismaAlertRepository implements IAlertRepository {

  save(alert: Alert): Promise<any> {
    return prisma.alert.create({
      data: {
        userId:  alert.userId,
        busId:   alert.busId,
        message: alert.message,
      }
    });
  }

  findByUser(userId: number): Promise<any[]> {
    return prisma.alert.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });
  }

  markAsRead(id: number): Promise<any> {
    return prisma.alert.update({
      where: { id },
      data:  { read: true },
    });
  }

  async delete(id: number): Promise<void> {
    await prisma.alert.delete({ where: { id } });
  }
}
