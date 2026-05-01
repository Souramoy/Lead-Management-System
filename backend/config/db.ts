import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

export const initDB = async () => {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS leads (
        id SERIAL PRIMARY KEY,
        name VARCHAR NOT NULL,
        phone VARCHAR NOT NULL,
        source VARCHAR CHECK (source IN ('Call', 'WhatsApp', 'Field')),
        status VARCHAR DEFAULT 'Interested' CHECK (status IN ('Interested', 'Not Interested', 'Converted')),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
    console.log('Database initialized successfully.');
  } catch (error) {
    console.error('Error initializing database:', error);
  }
}

export default pool;
