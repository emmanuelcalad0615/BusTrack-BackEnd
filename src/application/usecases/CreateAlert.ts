import Alert from '../../domain/entities/Alert';
import { IAlertRepository } from '../../domain/repositories/IAlertRepository';

interface CreateAlertInput {
  userId: number;
  busId: number;
  message: string;
}

export default class CreateAlert {
  constructor(private readonly alertRepository: IAlertRepository) {}

  execute({ userId, busId, message }: CreateAlertInput) {
    const alert = new Alert({ userId, busId, message });
    return this.alertRepository.save(alert);
  }
}
