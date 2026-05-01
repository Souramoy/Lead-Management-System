import { api } from '../services/api';
import { Lead } from '../types';

export const getLeads = async (): Promise<Lead[]> => {
  const res = await api.get('/leads');
  return res.data;
};

export const addLead = async (leadData: Omit<Lead, 'id' | 'created_at' | 'status'>): Promise<Lead> => {
  const res = await api.post('/leads', leadData);
  return res.data;
};

export const updateStatus = async (id: number, status: Lead['status']): Promise<Lead> => {
  const res = await api.put(`/leads/${id}`, { status });
  return res.data;
};

export const deleteLead = async (id: number): Promise<void> => {
  await api.delete(`/leads/${id}`);
};