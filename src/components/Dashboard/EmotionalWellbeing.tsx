import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip } from 'recharts';
import { Info } from 'lucide-react';
import { emotionalTracker } from '../../services/tracking/emotionalTracker';

const EmotionalWellbeing = () => {
  const data = emotionalTracker.getWeeklyData();

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">Emotional Wellbeing</h2>
        <div className="group relative">
          <Info className="w-5 h-5 text-gray-400 cursor-help" />
          <div className="absolute right-0 w-64 p-3 bg-gray-800 text-white text-sm rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10">
            <p>Track your emotional state throughout the week on a scale of 0-10:</p>
            <ul className="mt-2 space-y-1">
              <li>8-10: Excellent</li>
              <li>6-8: Good</li>
              <li>4-6: Neutral</li>
              <li>2-4: Low</li>
              <li>0-2: Poor</li>
            </ul>
          </div>
        </div>
      </div>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis 
              dataKey="day" 
              stroke="#666"
              tick={{ fill: '#666' }}
            />
            <YAxis 
              domain={[0, 10]} 
              ticks={[0, 2, 4, 6, 8, 10]} 
              stroke="#666"
            />
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  return (
                    <div className="bg-gray-800 text-white p-2 rounded-lg shadow-lg">
                      <p className="text-sm">{payload[0].payload.label}</p>
                      <p className="text-xs opacity-75">Value: {payload[0].value}</p>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Line
              type="monotone"
              dataKey="value"
              stroke="#8b5cf6"
              strokeWidth={2}
              dot={{ stroke: '#8b5cf6', strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, stroke: '#8b5cf6', strokeWidth: 2 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default EmotionalWellbeing;