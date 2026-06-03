interface BusLocationProps {
  busId: number;
  latitude: number;
  longitude: number;
}

export default class BusLocation {
  busId: number;
  latitude: number;
  longitude: number;

  constructor({ busId, latitude, longitude }: BusLocationProps) {
    if (!busId || busId < 1) {
      throw new Error('El busId debe ser un número positivo');
    }
    if (latitude < -90 || latitude > 90) {
      throw new Error('La latitud debe estar entre -90 y 90');
    }
    if (longitude < -180 || longitude > 180) {
      throw new Error('La longitud debe estar entre -180 y 180');
    }
    this.busId     = busId;
    this.latitude  = latitude;
    this.longitude = longitude;
  }
}
