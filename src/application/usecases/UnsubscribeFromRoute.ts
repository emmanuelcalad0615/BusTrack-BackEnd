import { ISubscriptionRepository } from '../../domain/repositories/ISubscriptionRepository';

export default class UnsubscribeFromRoute {
  constructor(private readonly subscriptionRepository: ISubscriptionRepository) {}

  async execute(id: number): Promise<void> {
    await this.subscriptionRepository.delete(id);
  }
}
