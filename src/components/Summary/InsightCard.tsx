import React from 'react';
import type { Insight } from '../../types';

interface InsightCardProps {
  insight: Insight;
}

const InsightCard: React.FC<InsightCardProps> = ({ insight }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h3 className="text-lg font-semibold mb-2">{insight.title}</h3>
      <p className="text-gray-600 mb-4">{insight.description}</p>
      <div className="flex items-center justify-between text-sm">
        <span className="text-gray-500">{insight.category}</span>
        <span className="text-gray-500">{insight.date}</span>
      </div>
    </div>
  );
};

export default InsightCard;