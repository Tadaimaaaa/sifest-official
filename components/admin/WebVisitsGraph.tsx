'use client';

import React, { useState, useMemo } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Calendar, ChevronDown, Filter } from 'lucide-react';

type FilterOption = 'today' | '3days' | '7days' | '1month' | 'custom';

export function WebVisitsGraph() {
  const [filter, setFilter] = useState<FilterOption>('7days');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  // Generate mock data based on the filter
  const data = useMemo(() => {
    const today = new Date();
    let days = 7;
    
    if (filter === 'today') days = 1; // we'll use hours for today
    else if (filter === '3days') days = 3;
    else if (filter === '7days') days = 7;
    else if (filter === '1month') days = 30;
    else if (filter === 'custom') {
      if (startDate && endDate) {
        const start = new Date(startDate);
        const end = new Date(endDate);
        const diffTime = Math.abs(end.getTime() - start.getTime());
        days = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
        // Cap to reasonable number for mock
        if (days > 60) days = 60;
      }
    }

    const mockData = [];
    if (filter === 'today') {
      for (let i = 8; i <= 20; i++) {
        mockData.push({
          name: `${i}:00`,
          visits: Math.floor(Math.random() * 50) + 10,
        });
      }
    } else {
      for (let i = days - 1; i >= 0; i--) {
        const d = new Date(today);
        d.setDate(d.getDate() - i);
        mockData.push({
          name: d.toLocaleDateString('id-ID', { day: 'numeric', month: 'short' }),
          visits: Math.floor(Math.random() * 500) + 50,
        });
      }
    }
    return mockData;
  }, [filter, startDate, endDate]);

  const totalVisits = data.reduce((acc, curr) => acc + curr.visits, 0);

  return (
    <div className="bg-white border border-slate-200/80 rounded-xl p-6 sm:p-8 mt-8 shadow-[0_4px_20px_rgba(0,0,0,0.03)] animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-8">
        <div>
          <h2 className="text-lg font-semibold text-slate-900">Grafik Kunjungan Web</h2>
          <p className="text-sm text-slate-500 mt-1">Total kunjungan: <strong className="text-slate-800">{totalVisits.toLocaleString('id-ID')}</strong></p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="relative">
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value as FilterOption)}
              className="appearance-none pl-10 pr-10 py-2.5 bg-slate-50 border border-slate-200 text-slate-700 text-sm rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all cursor-pointer font-medium"
            >
              <option value="today">Hari Ini</option>
              <option value="3days">3 Hari yang lalu</option>
              <option value="7days">7 Hari yang lalu</option>
              <option value="1month">1 Bulan yang lalu</option>
              <option value="custom">Kustom Tanggal</option>
            </select>
            <Filter className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
          </div>

          {filter === 'custom' && (
            <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 p-1 rounded-lg">
              <div className="relative">
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="pl-9 pr-3 py-1.5 bg-transparent text-sm text-slate-700 focus:outline-none focus:ring-0 [&::-webkit-calendar-picker-indicator]:opacity-0 [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:inset-0 [&::-webkit-calendar-picker-indicator]:w-full [&::-webkit-calendar-picker-indicator]:h-full [&::-webkit-calendar-picker-indicator]:cursor-pointer relative z-10"
                />
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
              </div>
              <span className="text-slate-400 text-sm">-</span>
              <div className="relative">
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="pl-9 pr-3 py-1.5 bg-transparent text-sm text-slate-700 focus:outline-none focus:ring-0 [&::-webkit-calendar-picker-indicator]:opacity-0 [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:inset-0 [&::-webkit-calendar-picker-indicator]:w-full [&::-webkit-calendar-picker-indicator]:h-full [&::-webkit-calendar-picker-indicator]:cursor-pointer relative z-10"
                />
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="h-[300px] w-full mt-4">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="colorVisits" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
            <XAxis 
              dataKey="name" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fontSize: 12, fill: '#64748b' }} 
              dy={10}
            />
            <YAxis 
              axisLine={false} 
              tickLine={false} 
              tick={{ fontSize: 12, fill: '#64748b' }} 
            />
            <Tooltip
              contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)' }}
              itemStyle={{ color: '#0f172a', fontWeight: 600 }}
            />
            <Area 
              type="monotone" 
              dataKey="visits" 
              name="Kunjungan"
              stroke="#3b82f6" 
              strokeWidth={3}
              fillOpacity={1} 
              fill="url(#colorVisits)" 
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
