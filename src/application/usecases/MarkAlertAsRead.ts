import { IAlertRepository } from '../../domain/repositories/IAlertRepository';

export default class MarkAlertAsRead {
  constructor(private readonly alertRepository: IAlertRepository) {}

  execute(id: number) {
    return this.alertRepository.markAsRead(id);
  }
}
