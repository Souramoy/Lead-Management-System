import React, { useState } from 'react';
import { X } from 'lucide-react';
import { addLead } from '../handlers/leadHandlers';

interface LeadFormProps {
  onClose: () => void;
  onSuccess: () => void;
}

export function LeadForm({ onClose, onSuccess }: LeadFormProps) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [source, setSource] = useState<'Call' | 'WhatsApp' | 'Field'>('Call');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addLead({ name, phone, source });
      onSuccess();
    } catch (err) {
      console.error('Failed to add lead', err);
      alert('Failed to add lead. Please check the database connection.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-800/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl border border-mint-2 shadow-2xl shadow-mint-aqua/20 w-full max-w-md overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        <div className="px-6 py-4 border-b border-mint-2 flex items-center justify-between">
          <h3 className="text-lg font-medium text-slate-800">Capture New Lead</h3>
          <button 
            onClick={onClose}
            className="text-emerald-700 hover:text-emerald-800 hover:bg-mint-beige rounded-full p-1 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="p-6">
          <div className="space-y-4">
            <div>
              <label className="block text-[10px] uppercase tracking-widest text-emerald-800 mb-2">Full Name</label>
              <input 
                type="text" 
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-mint-beige border border-mint-2 rounded-lg px-4 py-3 text-sm text-slate-800 placeholder:text-emerald-700 focus:outline-none focus:border-mint-aqua focus:ring-1 focus:ring-mint-aqua transition-colors"
                placeholder="John Doe"
              />
            </div>
            <div>
              <label className="block text-[10px] uppercase tracking-widest text-emerald-800 mb-2">Phone Number</label>
              <input 
                type="tel" 
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full bg-mint-beige border border-mint-2 rounded-lg px-4 py-3 text-sm text-slate-800 placeholder:text-emerald-700 focus:outline-none focus:border-mint-aqua focus:ring-1 focus:ring-mint-aqua transition-colors"
                placeholder="+1 (555) 000-0000"
              />
            </div>
            <div>
              <label className="block text-[10px] uppercase tracking-widest text-emerald-800 mb-2">Lead Source</label>
              <div className="grid grid-cols-3 gap-2">
                {(['Call', 'WhatsApp', 'Field'] as const).map(src => (
                  <button
                    key={src}
                    type="button"
                    onClick={() => setSource(src)}
                    className={`py-2 px-3 rounded-lg border text-sm font-medium transition-all ${
                      source === src 
                        ? 'bg-mint-aqua border-mint-aqua text-emerald-900 shadow-sm' 
                        : 'bg-white border-mint-2 text-emerald-700 hover:border-mint-aqua hover:text-emerald-800'
                    }`}
                  >
                    {src}
                  </button>
                ))}
              </div>
            </div>
          </div>
          <div className="mt-8 flex gap-3">
            <button 
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-3 bg-mint-tea border border-mint-2 text-slate-600 font-medium rounded-lg hover:bg-mint-2 transition-colors"
            >
              Cancel
            </button>
            <button 
              type="submit"
              className="flex-1 px-4 py-3 bg-mint-aqua hover:bg-mint-1 text-emerald-950 font-medium rounded-lg shadow-md shadow-mint-aqua/20 transition-all"
            >
              Register Lead
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
