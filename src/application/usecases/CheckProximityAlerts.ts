import { ISubscriptionRepository } from '../../domain/repositories/ISubscriptionRepository';
import { IBusRepository } from '../../domain/repositories/IBusRepository';
import { IAlertRepository } from '../../domain/repositories/IAlertRepository';
import Alert from '../../domain/entities/Alert';

interface CheckProximityInput {
  userId: number;
  latitude: number;
  longitude: number;
  thresholdMeters?: number;
}

// Fórmula Haversine — distancia en metros entre dos coordenadas GPS
function haversineMeters(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const R    = 6371000; // radio de la Tierra en metros
  const toRad = (deg: number) => (deg * Math.PI) / 180;

  const dLat = toRad(lat2 - lat1);
  const dLng = toRad(lng2 - lng1);

  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLng / 2) ** 2;

  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

export default class CheckProximityAlerts {
  constructor(
    private readonly subscriptionRepository: ISubscriptionRepository,
    private readonly busRepository: IBusRepository,
    private readonly alertRepository: IAlertRepository,
  ) {}

  async execute({ userId, latitude, longitude, thresholdMeters = 500 }: CheckProximityInput) {
    // 1. Rutas a las que está suscrito el usuario
    const subscriptions = await this.subscriptionRepository.findByUser(userId);
    if (subscriptions.length === 0) return { alertsCreated: 0, buses: [] };

    const routeIds = subscriptions.map((s: any) => s.routeId);

    // 2. Buses de esas rutas con su última ubicación GPS
    const buses = await this.busRepository.findByRoutesWithLocation(routeIds);

    const alertsCreated: any[] = [];

    for (const bus of buses) {
      if (!bus.location) continue;

      const distanceMeters = haversineMeters(
        latitude, longitude,
        bus.location.latitude, bus.location.longitude,
      );

      if (distanceMeters <= thresholdMeters) {
        const alert = new Alert({
          userId,
          busId:   bus.id,
          message: `Bus ${bus.plate} está a ${Math.round(distanceMeters)}m de tu ubicación`,
        });
        const saved = await this.alertRepository.save(alert);
        alertsCreated.push(saved);
      }
    }

    return { alertsCreated: alertsCreated.length, alerts: alertsCreated };
  }
}
