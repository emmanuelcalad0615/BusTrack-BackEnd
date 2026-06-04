import { ISubscriptionRepository } from '../../domain/repositories/ISubscriptionRepository';
import { IBusRepository } from '../../domain/repositories/IBusRepository';

// Bounding box de Bogotá.
const BOGOTA = { latMin: 4.48, latMax: 4.84, lngMin: -74.22, lngMax: -73.99 };

// Jitter ≈ 0.0025° ≈ 280 m. Diagonal máx ≈ 390 m < 500 m (umbral default de proximidad)
// → si caemos cerca de un bus, la alerta SIEMPRE se dispara.
const JITTER = 0.0025;

function clamp(v: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, v));
}
function rand(min: number, max: number): number {
  return Math.random() * (max - min) + min;
}

interface RandomLocationOutput {
  latitude: number;
  longitude: number;
  nearBusId: number | null;   // bus al que se acercó la ubicación (si lo hubo)
  strategy: 'near-bus' | 'random';
}

/**
 * Genera una ubicación aleatoria del usuario dentro de Bogotá.
 *
 * Estrategia: para que el sistema de alertas SE ACTIVE de forma fiable, sesgamos el
 * punto a quedar dentro del umbral de proximidad de un bus de las rutas a las que el
 * usuario está suscrito. Si el usuario no tiene suscripciones o ningún bus tiene
 * posición todavía, cae a un punto uniformemente aleatorio en Bogotá.
 */
export default class GetRandomUserLocation {
  constructor(
    private readonly subscriptionRepository: ISubscriptionRepository,
    private readonly busRepository: IBusRepository,
  ) {}

  async execute(userId: number): Promise<RandomLocationOutput> {
    const subscriptions = await this.subscriptionRepository.findByUser(userId);
    const routeIds = subscriptions.map((s: any) => s.routeId);

    if (routeIds.length > 0) {
      const buses = await this.busRepository.findByRoutesWithLocation(routeIds);
      const withLocation = buses.filter((b) => b.location !== null);

      if (withLocation.length > 0) {
        // Elige un bus al azar y aterriza la ubicación del usuario junto a él.
        const bus = withLocation[Math.floor(Math.random() * withLocation.length)];
        const loc = bus.location!;
        return {
          latitude:  clamp(loc.latitude  + rand(-JITTER, JITTER), BOGOTA.latMin, BOGOTA.latMax),
          longitude: clamp(loc.longitude + rand(-JITTER, JITTER), BOGOTA.lngMin, BOGOTA.lngMax),
          nearBusId: bus.id,
          strategy:  'near-bus',
        };
      }
    }

    // Fallback: aleatorio puro en Bogotá (alertas pueden no dispararse).
    return {
      latitude:  rand(BOGOTA.latMin, BOGOTA.latMax),
      longitude: rand(BOGOTA.lngMin, BOGOTA.lngMax),
      nearBusId: null,
      strategy:  'random',
    };
  }
}
