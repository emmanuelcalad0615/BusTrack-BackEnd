import Alert from '../entities/Alert';

export interface IAlertRepository {
  save(alert: Alert): Promise<Alert>;
  findByUser(userId: number): Promise<Alert[]>;
  markAsRead(id: number): Promise<Alert>;
  delete(id: number): Promise<void>;
}
