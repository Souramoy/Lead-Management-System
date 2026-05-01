import React from 'react';
import { Lead } from '../types';

export function StatusBadge({ status }: { status: Lead['status'] }) {
  switch(status) {
    case 'Interested':
      return <span className="px-2 py-1 bg-mint-tea text-emerald-800 border-mint-2 text-[10px] font-bold rounded border uppercase tracking-wider">{status}</span>;
    case 'Converted':
      return <span className="px-2 py-1 bg-mint-aqua text-emerald-950 border-mint-aqua text-[10px] font-bold rounded border uppercase tracking-wider">{status}</span>;
    case 'Not Interested':
      return <span className="px-2 py-1 bg-mint-beige text-emerald-700 border-mint-2 text-[10px] font-bold rounded border uppercase tracking-wider">{status}</span>;
    default:
      return null;
  }
}
