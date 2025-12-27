import React from 'react';
import { AreaChart, Area, XAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { DailyData } from '../types';

interface DailyChartProps {
  data: DailyData[];
}

export const DailyChart: React.FC<DailyChartProps> = ({ data }) => {
  return (
    <div className="w-full h-48 mt-8">
      <div className="text-center text-slate-600 mb-2 text-sm font-medium">Daily Average</div>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={data}
          margin={{
            top: 10,
            right: 0,
            left: 0,
            bottom: 0,
          }}
        >
          <defs>
            <linearGradient id="colorAmount" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#93C5FD" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#93C5FD" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <XAxis 
            dataKey="day" 
            axisLine={false} 
            tickLine={false} 
            tick={{ fill: '#94A3B8', fontSize: 12 }}
            dy={10}
          />
          <Tooltip 
             contentStyle={{ backgroundColor: '#F0F9FF', borderRadius: '10px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
             cursor={{ stroke: '#3B82F6', strokeWidth: 1, strokeDasharray: '3 3' }}
          />
          <Area 
            type="monotone" 
            dataKey="amount" 
            stroke="#3B82F6" 
            strokeWidth={3}
            fillOpacity={1} 
            fill="url(#colorAmount)" 
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};
