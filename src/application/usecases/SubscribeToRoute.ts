import Subscription from '../../domain/entities/Subscription';
import { ISubscriptionRepository } from '../../domain/repositories/ISubscriptionRepository';

interface SubscribeInput {
  userId: number;
  routeId: number;
}

export default class SubscribeToRoute {
  constructor(private readonly subscriptionRepository: ISubscriptionRepository) {}

  async execute({ userId, routeId }: SubscribeInput): Promise<Subscription> {
    const exists = await this.subscriptionRepository.findByUserAndRoute(userId, routeId);
    if (exists) {
      throw new Error('Ya estás suscrito a esta ruta');
    }
    const subscription = new Subscription({ userId, routeId });
    return this.subscriptionRepository.save(subscription);
  }
}
