import React from 'react';
import { Download } from 'lucide-react';
import type { WeeklySummary } from '../types';

interface WeeklySummaryProps {
  summary: WeeklySummary;
}

const WeeklySummaryView: React.FC<WeeklySummaryProps> = ({ summary }) => {
  return (
    <div className="bg-white rounded-lg p-6 shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold">AI Weekly Summary</h2>
          <p className="text-gray-600">
            Week of {summary.weekStart.toLocaleDateString()} -{' '}
            {summary.weekEnd.toLocaleDateString()}
          </p>
        </div>
        <button className="flex items-center space-x-2 bg-gray-900 text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors">
          <Download className="w-4 h-4" />
          <span>Generate & Export</span>
        </button>
      </div>

      <div className="space-y-6">
        <section>
          <h3 className="text-xl font-semibold mb-3">Key Achievements</h3>
          <ul className="space-y-2">
            {summary.achievements.map((achievement, index) => (
              <li key={index} className="flex items-center space-x-2">
                <span className="text-green-500">•</span>
                <span>{achievement}</span>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
};

export default WeeklySummaryView;