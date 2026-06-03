interface SubscriptionProps {
  userId: number;
  routeId: number;
}

export default class Subscription {
  userId: number;
  routeId: number;

  constructor({ userId, routeId }: SubscriptionProps) {
    if (!userId || userId < 1) {
      throw new Error('El userId debe ser un número positivo');
    }
    if (!routeId || routeId < 1) {
      throw new Error('El routeId debe ser un número positivo');
    }
    this.userId  = userId;
    this.routeId = routeId;
  }
}
