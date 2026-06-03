import { IAlertRepository } from '../../domain/repositories/IAlertRepository';

export default class GetUserAlerts {
  constructor(private readonly alertRepository: IAlertRepository) {}

  execute(userId: number) {
    return this.alertRepository.findByUser(userId);
  }
}
