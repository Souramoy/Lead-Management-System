import axios from 'axios';

const baseURL = (import.meta.env.VITE_BACKEND_URL ?? 'http://localhost:3000').replace(/\/$/, '');

export const api = axios.create({
  baseURL: `${baseURL}/api`,
});