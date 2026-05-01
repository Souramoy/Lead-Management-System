import express from 'express';
import cors from 'cors';
import { initDB } from './config/db.js';
import leadRoutes from './routes/leadRoutes.js';
import dotenv from 'dotenv';

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = Number(process.env.PORT) || 3000;
  const frontendUrl = process.env.FRONTEND_URL;

  app.use(
    cors({
      origin: frontendUrl || true,
    })
  );
  app.use(express.json());

  if (process.env.DATABASE_URL) {
    await initDB();
  } else {
    console.warn("DATABASE_URL is not set. Database will not be initialized.");
  }

  app.use('/api/leads', leadRoutes);

  app.listen(PORT, "localhost", () => {
    console.log(`API server running on http://localhost:${PORT}`);
  });
}

startServer();
