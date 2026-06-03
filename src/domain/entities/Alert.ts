interface AlertProps {
  userId: number;
  busId: number;
  message: string;
}

export default class Alert {
  userId: number;
  busId: number;
  message: string;

  constructor({ userId, busId, message }: AlertProps) {
    if (!userId || userId < 1) {
      throw new Error('El userId debe ser un número positivo');
    }
    if (!busId || busId < 1) {
      throw new Error('El busId debe ser un número positivo');
    }
    if (!message || message.trim().length < 2) {
      throw new Error('El mensaje debe tener al menos 2 caracteres');
    }
    this.userId  = userId;
    this.busId   = busId;
    this.message = message.trim();
  }
}
