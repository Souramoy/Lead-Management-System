import React from 'react';

export function StatCard({ title, value, icon, bgColor }: { title: string, value: number, icon: React.ReactNode, bgColor: string }) {
  return (
    <div className="bg-white p-5 rounded-xl border border-mint-2 relative overflow-hidden group shadow-sm">
      <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
        <div className="w-24 h-24 rounded-full blur-2xl transform translate-x-12 -translate-y-8 bg-mint-aqua"></div>
      </div>
      <div className="flex items-center gap-3 mb-3 relative z-10">
        <div className={`w-10 h-10 rounded-xl ${bgColor} flex items-center justify-center`}>
          {icon}
        </div>
        <div className="font-medium text-xs uppercase tracking-wider text-emerald-700">{title}</div>
      </div>
      <div className="flex items-end justify-between relative z-10">
        <div className="text-3xl font-light text-slate-800 tracking-tight">{value}</div>
      </div>
    </div>
  );
}
