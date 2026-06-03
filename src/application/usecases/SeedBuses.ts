import { IRouteRepository } from '../../domain/repositories/IRouteRepository';
import { IBusRepository } from '../../domain/repositories/IBusRepository';
import Bus from '../../domain/entities/Bus';

const BUS_MODELS = ['Volvo 7900', 'Mercedes O500', 'Scania K310', 'Marcopolo G7', 'Busscar Urbanuss'];

function randomItem<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generatePlate(): string {
  const letters = 'ABCDEFGHJKLMNPQRSTUVWXYZ';
  const l = () => letters[Math.floor(Math.random() * letters.length)];
  const n = () => Math.floor(Math.random() * 10);
  return `${l()}${l()}${l()}${n()}${n()}${n()}`;
}

export default class SeedBuses {
  constructor(
    private readonly routeRepository: IRouteRepository,
    private readonly busRepository: IBusRepository,
  ) {}

  async execute(busesPerRoute = 2): Promise<{ created: number; failed: number }> {
    const routes = await this.routeRepository.findAll();

    let created = 0;
    let failed  = 0;

    for (const route of routes) {
      for (let i = 0; i < busesPerRoute; i++) {
        try {
          const bus = new Bus({
            plate:    generatePlate(),
            model:    randomItem(BUS_MODELS),
            capacity: randomInt(40, 90),
            routeId:  route.id!,
            active:   true,
          });
          await this.busRepository.save(bus);
          created++;
        } catch {
          failed++;
        }
      }
    }

    return { created, failed };
  }
}
