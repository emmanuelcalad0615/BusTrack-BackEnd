import axios from 'axios';
import AdmZip from 'adm-zip';

export interface GTFSRoute {
  name: string;
  origin: string;
  destination: string;
}

export default class GTFSService {
  private readonly feedUrl = 'https://storage.googleapis.com/gtfs-estaticos/GTFS-2024-02-21.zip';

  async getRoutes(): Promise<GTFSRoute[]> {
    // Descarga el ZIP como buffer binario
    const response = await axios.get(this.feedUrl, {
      responseType: 'arraybuffer',
    });

    // Extrae routes.txt del ZIP
    const zip = new AdmZip(Buffer.from(response.data));
    const routesFile = zip.getEntry('routes.txt');

    if (!routesFile) {
      throw new Error('routes.txt no encontrado en el feed GTFS');
    }

    const content = routesFile.getData().toString('utf-8');
    const lines   = content.split('\n').map(l => l.trim()).filter(Boolean);

    // Primera línea = headers
    const headers = lines[0].split(',').map(h => h.trim().replace(/"/g, ''));
    const nameIdx    = headers.indexOf('route_long_name');
    const shortIdx   = headers.indexOf('route_short_name');

    const routes: GTFSRoute[] = [];

    for (const line of lines.slice(1)) {
      const cols = line.split(',').map(c => c.trim().replace(/"/g, ''));

      const longName  = cols[nameIdx]  || '';
      const shortName = cols[shortIdx] || '';

      // Transmilenio usa formato "Origen - Destino" en route_long_name
      const parts = longName.split(' - ');

      const origin      = parts[0]?.trim() || shortName || 'Desconocido';
      const destination = parts[1]?.trim() || shortName || 'Desconocido';
      const name        = longName || shortName || 'Sin nombre';

      if (name.length >= 2 && origin.length >= 2 && destination.length >= 2) {
        routes.push({ name, origin, destination });
      }
    }

    return routes;
  }
}
