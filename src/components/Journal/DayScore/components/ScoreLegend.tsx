import React from 'react';
import { getScoreColor } from '../utils/colors';
import type { ScoreLegendItem } from '../types';

const legendItems: ScoreLegendItem[] = [
  { score: 'challenging', title: 'Challenging Day', description: 'Faced significant obstacles' },
  { score: 'good', title: 'Good Day', description: 'Accomplished goals' },
  { score: 'average', title: 'Average Day', description: 'Met basic expectations' },
  { score: 'excellent', title: 'Excellent Day', description: 'Exceeded expectations' },
];

const ScoreLegend: React.FC = () => {
  return (
    <div className="mt-6">
      <h3 className="text-sm font-medium text-gray-700 mb-2">Score Legend</h3>
      <div className="grid grid-cols-2 gap-4">
        {legendItems.map((item) => (
          <div key={item.score} className="flex items-center space-x-2">
            <div className={`w-4 h-4 rounded-sm ${getScoreColor(item.score)}`}></div>
            <div>
              <div className="text-sm font-medium">{item.title}</div>
              <div className="text-xs text-gray-500">{item.description}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ScoreLegend;