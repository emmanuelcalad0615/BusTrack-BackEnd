import prisma from './prismaClient';
import Subscription from '../../domain/entities/Subscription';
import { ISubscriptionRepository } from '../../domain/repositories/ISubscriptionRepository';

export default class PrismaSubscriptionRepository implements ISubscriptionRepository {

  save(subscription: Subscription): Promise<any> {
    return prisma.subscription.create({
      data: {
        userId:  subscription.userId,
        routeId: subscription.routeId,
      }
    });
  }

  findByUser(userId: number): Promise<any[]> {
    return prisma.subscription.findMany({
      where: { userId },
      include: { route: true },
    });
  }

  findByUserAndRoute(userId: number, routeId: number): Promise<any> {
    return prisma.subscription.findFirst({
      where: { userId, routeId },
    });
  }

  async delete(id: number): Promise<void> {
    await prisma.subscription.delete({ where: { id } });
  }
}
