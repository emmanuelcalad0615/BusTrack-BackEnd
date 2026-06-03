import Subscription from '../entities/Subscription';

export interface ISubscriptionRepository {
  save(subscription: Subscription): Promise<Subscription>;
  findByUser(userId: number): Promise<Subscription[]>;
  findByUserAndRoute(userId: number, routeId: number): Promise<Subscription | null>;
  delete(id: number): Promise<void>;
}
