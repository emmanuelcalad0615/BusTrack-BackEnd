# BusTrack — Backend API

Sistema de rastreo de buses en tiempo real con alertas de proximidad. API REST construida con **Clean Architecture**, **Node.js**, **TypeScript**, **Express**, **Prisma 7** y **Supabase (PostgreSQL)**.

---

## Stack tecnológico

| Tecnología | Rol |
|---|---|
| Node.js + TypeScript | Runtime + tipado estático |
| Express | Servidor HTTP |
| Prisma 7 | ORM + migraciones |
| Supabase (PostgreSQL) | Base de datos en la nube |
| JWT + bcryptjs | Autenticación y seguridad |
| Zod | Validación de datos en el borde HTTP |
| Swagger UI | Documentación interactiva de endpoints |
| GTFS (SIMUR Bogotá) | Datos reales de rutas de transporte |

---

## Arquitectura

Implementación estricta de **Clean Architecture** — las dependencias apuntan hacia adentro:

```
domain  ←  application  ←  interfaces / infrastructure
(núcleo)    (casos de uso)   (HTTP, DB, servicios externos)
```

```
src/
├── domain/               # Entidades y contratos (sin dependencias externas)
│   ├── entities/         # User, Bus, Route, Alert, BusLocation, Subscription
│   └── repositories/     # Interfaces (puertos)
├── application/          # Casos de uso (lógica de negocio pura)
│   └── usecases/
├── infrastructure/       # Implementaciones concretas
│   ├── db/               # Prisma repositories
│   ├── gtfs/             # Servicio de integración GTFS
│   ├── middlewares/      # Auth, validación, roles, error handler
│   └── swagger/          # Documentación OpenAPI
└── interfaces/           # Entrada HTTP
    ├── controllers/
    └── routes/
```

---

## Características del MVP

- **Autenticación** — Registro, login con JWT, roles `USER` y `ADMIN`
- **Rutas reales** — Sincronización con el feed GTFS oficial del SIMUR Bogotá
- **Flota de buses** — CRUD completo + seed automático desde rutas reales
- **Suscripciones** — Usuarios se suscriben a rutas frecuentes
- **GPS en tiempo real** — Ubicación de buses con upsert (solo última posición por bus)
- **Simulación GPS** — Genera posiciones aleatorias dentro de Bogotá para testing
- **Alertas de proximidad** — Detecta buses cercanos usando la fórmula Haversine
- **Control de acceso por roles** — Endpoints administrativos protegidos

---

## Instalación

### Requisitos
- Node.js 18+
- Cuenta en [Supabase](https://supabase.com) (gratis)

### Pasos

```bash
# 1. Clonar el repositorio
git clone <url-del-repo>
cd BusTrack-BackEnd

# 2. Instalar dependencias
npm install

# 3. Configurar variables de entorno
cp .env.example .env
# Editar .env con tus credenciales

# 4. Correr migraciones
npx prisma migrate dev

# 5. Generar cliente Prisma
npm run prisma:generate

# 6. Iniciar el servidor
npm run dev
```

---

## Variables de entorno

```env
PORT=3000
DATABASE_URL="postgresql://postgres:[PASSWORD]@db.xxxx.supabase.co:5432/postgres"
JWT_SECRET="string_largo_y_seguro"
ADMIN_SECRET="clave_para_crear_administradores"
```

---

## Endpoints principales

La documentación completa está disponible en Swagger UI:

```
http://localhost:3000/api/docs
```

### Auth
| Método | Ruta | Descripción | Auth |
|---|---|---|---|
| POST | `/api/v1/auth/register` | Registrar usuario | Público |
| POST | `/api/v1/auth/login` | Iniciar sesión | Público |
| POST | `/api/v1/auth/register-admin` | Registrar admin | Secret key |

### Rutas
| Método | Ruta | Descripción | Auth |
|---|---|---|---|
| GET | `/api/v1/routes` | Listar rutas | JWT |
| POST | `/api/v1/routes` | Crear ruta | JWT |
| PUT | `/api/v1/routes/:id` | Actualizar ruta | JWT |
| DELETE | `/api/v1/routes/:id` | Eliminar ruta | JWT |

### Buses
| Método | Ruta | Descripción | Auth |
|---|---|---|---|
| GET | `/api/v1/buses` | Listar buses | JWT |
| POST | `/api/v1/buses` | Crear bus | JWT |
| PUT | `/api/v1/buses/:id` | Actualizar bus | JWT |
| DELETE | `/api/v1/buses/:id` | Eliminar bus | JWT |

### Ubicación GPS
| Método | Ruta | Descripción | Auth |
|---|---|---|---|
| GET | `/api/v1/locations/:busId` | Última ubicación del bus | JWT |
| POST | `/api/v1/locations/:busId` | Actualizar ubicación (upsert) | JWT |
| POST | `/api/v1/locations/:busId/simulate` | Simular posición en Bogotá | JWT |

### Alertas
| Método | Ruta | Descripción | Auth |
|---|---|---|---|
| GET | `/api/v1/alerts/me` | Mis alertas | JWT |
| POST | `/api/v1/alerts` | Crear alerta manual | JWT |
| POST | `/api/v1/alerts/proximity` | Detectar buses cercanos | JWT |
| PATCH | `/api/v1/alerts/:id/read` | Marcar como leída | JWT |
| DELETE | `/api/v1/alerts/:id` | Eliminar alerta | JWT |

### Suscripciones
| Método | Ruta | Descripción | Auth |
|---|---|---|---|
| GET | `/api/v1/subscriptions/me` | Mis suscripciones | JWT |
| POST | `/api/v1/subscriptions` | Suscribirse a una ruta | JWT |
| DELETE | `/api/v1/subscriptions/:id` | Cancelar suscripción | JWT |

### Sync (solo ADMIN)
| Método | Ruta | Descripción | Auth |
|---|---|---|---|
| GET | `/api/v1/sync/routes` | Importar rutas desde GTFS Bogotá | JWT + ADMIN |
| POST | `/api/v1/sync/buses` | Generar buses para rutas existentes | JWT + ADMIN |

---

## Flujo de proximidad

```
POST /alerts/proximity
  { latitude, longitude, thresholdMeters? }
        ↓
Obtiene rutas suscritas del usuario
        ↓
Busca buses en esas rutas con su última ubicación GPS
        ↓
Calcula distancia con fórmula Haversine
        ↓
Crea alerta si distancia ≤ umbral (default: 500m)
        ↓
Devuelve alertas generadas
```

---

## Scripts

```bash
npm run dev             # Servidor con hot reload
npm run build           # Compilar TypeScript
npm run start           # Correr build de producción
npm run prisma:migrate  # Aplicar migraciones
npm run prisma:generate # Regenerar cliente Prisma
```

---

## Fuente de datos

Las rutas de transporte provienen del **feed GTFS oficial del SIMUR** (Sistema Integrado de Movilidad Urbana de Bogotá), publicado por la Alcaldía de Bogotá. Los datos de ubicación GPS de los buses son simulados para fines de demostración.
