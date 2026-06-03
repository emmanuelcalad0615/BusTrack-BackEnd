import { ISubscriptionRepository } from '../../domain/repositories/ISubscriptionRepository';

export default class GetUserSubscriptions {
  constructor(private readonly subscriptionRepository: ISubscriptionRepository) {}

  execute(userId: number) {
    return this.subscriptionRepository.findByUser(userId);
  }
}
