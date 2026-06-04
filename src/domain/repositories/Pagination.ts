// Tipos genéricos de paginación compartidos por los repositorios.
// Viven en domain porque son parte del contrato (puerto), no un detalle de Prisma.

export interface FindAllParams<F> {
  skip: number;   // cuántos registros saltar (offset)
  take: number;   // cuántos traer (limit)
  filters: F;     // filtros específicos de cada entidad
}

export interface PaginatedResult<T> {
  data: T[];
  total: number;  // total SIN paginar — necesario para calcular nº de páginas en el front
}
