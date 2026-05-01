import React from 'react';
import { Lead } from '../types';
import { PhoneCall, MessageCircle, MapPin, Trash2, UserPlus } from 'lucide-react';
import { StatusBadge } from './StatusBadge';
import { updateStatus, deleteLead } from '../handlers/leadHandlers';

interface LeadListProps {
  leads: Lead[];
  loading: boolean;
  onLeadUpdated: () => void;
  filterStatus: 'All' | Lead['status'];
  onFilterChange: (status: 'All' | Lead['status']) => void;
}

export function LeadList({ leads, loading, onLeadUpdated, filterStatus, onFilterChange }: LeadListProps) {
  const handleUpdateStatus = async (id: number, status: Lead['status']) => {
    try {
      await updateStatus(id, status);
      onLeadUpdated();
    } catch (err) {
      console.error('Failed to update status', err);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteLead(id);
      onLeadUpdated();
    } catch (err) {
      console.error('Failed to delete lead', err);
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-mint-2 shadow-sm overflow-hidden">
      <div className="px-6 py-4 border-b border-mint-2 flex items-center justify-between">
        <h2 className="text-lg font-medium text-slate-800">Recent Leads</h2>
        <div className="flex items-center gap-2">
          <label className="text-xs text-emerald-800 font-medium hidden sm:block">Filter:</label>
          <select 
            value={filterStatus}
            onChange={(e) => onFilterChange(e.target.value as any)}
            className="text-sm bg-mint-beige border border-mint-2 text-slate-800 rounded-lg px-3 py-1.5 outline-none hover:border-mint-aqua focus:border-mint-aqua cursor-pointer shadow-sm transition-colors"
          >
            <option value="All">All Statuses</option>
            <option value="Interested">Interested</option>
            <option value="Not Interested">Not Interested</option>
            <option value="Converted">Converted</option>
          </select>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse text-sm text-slate-800">
          <thead className="bg-mint-beige border-b border-mint-2 text-[10px] uppercase tracking-widest text-emerald-800 font-semibold whitespace-nowrap">
            <tr>
              <th className="px-6 py-4">Lead Info</th>
              <th className="px-6 py-4">Source</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Date</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-mint-2">
            {loading ? (
              <tr>
                <td colSpan={5} className="px-6 py-8 text-center text-emerald-700">Loading leads...</td>
              </tr>
            ) : leads.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-8 text-center text-emerald-700">
                  <div className="flex flex-col items-center justify-center">
                    <UserPlus className="w-10 h-10 text-mint-tea mb-2" />
                    <p>No leads found. Create one to get started.</p>
                  </div>
                </td>
              </tr>
            ) : (
              leads.map((lead) => (
                <tr key={lead.id} className="hover:bg-mint-beige/50 transition-colors whitespace-nowrap">
                  <td className="px-6 py-4">
                    <div className="font-medium text-slate-800">{lead.name}</div>
                    <div className="text-xs text-emerald-700">{lead.phone}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center gap-1.5 text-emerald-800 text-xs font-medium">
                      {lead.source === 'Call' && <PhoneCall className="w-3 h-3 text-emerald-800" />}
                      {lead.source === 'WhatsApp' && <MessageCircle className="w-3 h-3 text-emerald-800" />}
                      {lead.source === 'Field' && <MapPin className="w-3 h-3 text-emerald-800" />}
                      {lead.source}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <StatusBadge status={lead.status} />
                  </td>
                  <td className="px-6 py-4 text-xs text-slate-600">
                    {new Date(lead.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                       <select 
                          value={lead.status}
                          onChange={(e) => handleUpdateStatus(lead.id, e.target.value as any)}
                          className="text-[10px] uppercase font-bold tracking-wider bg-white border border-mint-2 text-slate-600 rounded px-2 py-1 outline-none hover:border-mint-aqua focus:border-mint-aqua cursor-pointer"
                        >
                          <option value="Interested">Interested</option>
                          <option value="Not Interested">Not Interested</option>
                          <option value="Converted">Converted</option>
                        </select>
                        <button 
                          onClick={() => handleDelete(lead.id)}
                          className="p-1.5 text-emerald-700 hover:text-white hover:bg-red-500 rounded transition-colors"
                          title="Delete lead"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
