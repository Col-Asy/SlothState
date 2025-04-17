
import React from 'react';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { 
  Line, 
  LineChart, 
  ResponsiveContainer, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend 
} from 'recharts';

const data = [
  { name: 'Mon', visitors: 4000, sessions: 2400, conversions: 240 },
  { name: 'Tue', visitors: 3000, sessions: 1398, conversions: 210 },
  { name: 'Wed', visitors: 2000, sessions: 9800, conversions: 290 },
  { name: 'Thu', visitors: 2780, sessions: 3908, conversions: 200 },
  { name: 'Fri', visitors: 1890, sessions: 4800, conversions: 218 },
  { name: 'Sat', visitors: 2390, sessions: 3800, conversions: 250 },
  { name: 'Sun', visitors: 3490, sessions: 4300, conversions: 210 },
];

const chartConfig = {
  visitors: {
    label: 'Visitors',
    color: '#8B5CF6',
  },
  sessions: {
    label: 'Sessions',
    color: '#0EA5E9',
  },
  conversions: {
    label: 'Conversions',
    color: '#22C55E',
  },
};

export const TrendChart = () => {
  return (
    <div className="w-full h-[300px]">
      <ChartContainer config={chartConfig}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
          <XAxis dataKey="name" stroke="#94a3b8" />
          <YAxis stroke="#94a3b8" />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Line 
            type="monotone" 
            dataKey="visitors" 
            stroke="#8B5CF6" 
            strokeWidth={2} 
            activeDot={{ r: 6 }}
            name="visitors" 
          />
          <Line 
            type="monotone" 
            dataKey="sessions" 
            stroke="#0EA5E9" 
            strokeWidth={2}
            name="sessions" 
          />
          <Line 
            type="monotone" 
            dataKey="conversions" 
            stroke="#22C55E" 
            strokeWidth={2}
            name="conversions" 
          />
        </LineChart>
      </ChartContainer>
    </div>
  );
};
