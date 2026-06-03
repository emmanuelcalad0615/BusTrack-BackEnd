import { IAlertRepository } from '../../domain/repositories/IAlertRepository';

export default class DeleteAlert {
  constructor(private readonly alertRepository: IAlertRepository) {}

  async execute(id: number): Promise<void> {
    await this.alertRepository.delete(id);
  }
}
