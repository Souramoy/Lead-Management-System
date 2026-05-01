import { Request, Response } from 'express';
import pool from '../config/db.js';

export const getLeads = async (req: Request, res: Response): Promise<void> => {
  if (!process.env.DATABASE_URL) {
    res.json([]);
    return;
  }
  try {
    const result = await pool.query('SELECT * FROM leads ORDER BY created_at DESC');
    res.json(result.rows);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const addLead = async (req: Request, res: Response): Promise<void> => {
  if (!process.env.DATABASE_URL) {
    res.status(503).json({ error: 'Database not configured. Please add DATABASE_URL to your secrets.' });
    return;
  }
  const { name, phone, source } = req.body;
  if (!name || !phone || !source) {
    res.status(400).json({ error: 'Name, phone, and source are required' });
    return;
  }
  try {
    const result = await pool.query(
      'INSERT INTO leads (name, phone, source) VALUES ($1, $2, $3) RETURNING *',
      [name, phone, source]
    );
    res.status(201).json(result.rows[0]);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const updateLeadStatus = async (req: Request, res: Response): Promise<void> => {
  if (!process.env.DATABASE_URL) {
    res.status(503).json({ error: 'Database not configured. Please add DATABASE_URL to your secrets.' });
    return;
  }
  const { id } = req.params;
  const { status } = req.body;
  if (!status) {
    res.status(400).json({ error: 'Status is required' });
    return;
  }
  try {
    const result = await pool.query(
      'UPDATE leads SET status = $1 WHERE id = $2 RETURNING *',
      [status, id]
    );
    if (result.rows.length === 0) {
      res.status(404).json({ error: 'Lead not found' });
      return;
    }
    res.json(result.rows[0]);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteLead = async (req: Request, res: Response): Promise<void> => {
  if (!process.env.DATABASE_URL) {
    res.status(503).json({ error: 'Database not configured. Please add DATABASE_URL to your secrets.' });
    return;
  }
  const { id } = req.params;
  try {
    const result = await pool.query('DELETE FROM leads WHERE id = $1 RETURNING *', [id]);
    if (result.rows.length === 0) {
      res.status(404).json({ error: 'Lead not found' });
      return;
    }
    res.json({ message: 'Lead deleted' });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};
