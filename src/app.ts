import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import swaggerUi from 'swagger-ui-express';
import router from './interfaces/routes/index';
import { errorHandler } from './infrastructure/middlewares/errorHandler';
import { swaggerSpec } from './infrastructure/swagger/swagger';
import { BusSimulator } from './infrastructure/simulation/BusSimulator';

dotenv.config();

const app = express();

// Orígenes permitidos para el frontend. FRONTEND_URL (Vercel) se agrega por env
// para no hardcodear el dominio de producción en el código.
const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:3001',
  ...(process.env.FRONTEND_URL ? [process.env.FRONTEND_URL] : []),
];

app.use(cors({ origin: allowedOrigins, credentials: true }));

app.use(express.json());

app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use('/api/v1', router);

app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
  console.log(`Documentación en http://localhost:${PORT}/api/docs`);

  // Simulador de GPS en tiempo real. Se apaga con SIMULATION_ENABLED=false.
  if (process.env.SIMULATION_ENABLED !== 'false') {
    const intervalMs = Number(process.env.SIMULATION_INTERVAL_MS) || 5000;
    new BusSimulator(intervalMs).start();
  }
});

export default app;
