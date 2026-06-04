import prisma from '../db/prismaClient';
import BusLocation from '../../domain/entities/BusLocation';
import PrismaBusLocationRepository from '../db/PrismaBusLocationRepository';

// Bounding box de Bogotá (mismo que SimulateBusLocation).
const BOGOTA = { latMin: 4.48, latMax: 4.84, lngMin: -74.22, lngMax: -73.99 };

// Paso máximo por tick ≈ 150 m. Da sensación de movimiento sin teletransportar.
const STEP = 0.0015;

function clamp(v: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, v));
}
function rand(min: number, max: number): number {
  return Math.random() * (max - min) + min;
}

/**
 * Simulador de GPS en tiempo real.
 * En cada tick mueve un poco (random walk) la posición de TODOS los buses activos
 * y hace upsert en BusLocation. El frontend, al hacer polling de /locations/:busId,
 * ve las posiciones cambiar → efecto "tiempo real".
 *
 * Es infraestructura (efecto secundario sobre la DB), no lógica de negocio:
 * por eso vive aquí y usa prisma + el repo directamente.
 */
export class BusSimulator {
  private timer: NodeJS.Timeout | null = null;
  private readonly repo = new PrismaBusLocationRepository();

  constructor(private readonly intervalMs = 5000) {}

  start(): void {
    if (this.timer) return; // evita arrancar dos veces
    this.timer = setInterval(
      () => this.tick().catch((e) => console.error('[SIM] tick falló:', e.message)),
      this.intervalMs,
    );
    console.log(`[SIM] Simulador de buses activo (cada ${this.intervalMs} ms)`);
  }

  stop(): void {
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
  }

  private async tick(): Promise<void> {
    const buses = await prisma.bus.findMany({
      where: { active: true },
      include: { location: true },
    });

    for (const bus of buses) {
      let latitude: number;
      let longitude: number;

      if (bus.location) {
        // Mueve desde la última posición conocida.
        latitude  = clamp(bus.location.latitude  + rand(-STEP, STEP), BOGOTA.latMin, BOGOTA.latMax);
        longitude = clamp(bus.location.longitude + rand(-STEP, STEP), BOGOTA.lngMin, BOGOTA.lngMax);
      } else {
        // Primer reporte: posición aleatoria dentro de Bogotá.
        latitude  = rand(BOGOTA.latMin, BOGOTA.latMax);
        longitude = rand(BOGOTA.lngMin, BOGOTA.lngMax);
      }

      // Pasa por la entidad de dominio para validar rangos antes de persistir.
      await this.repo.upsert(new BusLocation({ busId: bus.id, latitude, longitude }));
    }
  }
}
