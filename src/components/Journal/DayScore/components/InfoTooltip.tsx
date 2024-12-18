import React from 'react';
import { Info } from 'lucide-react';

const InfoTooltip: React.FC = () => {
  return (
    <div className="group relative">
      <Info className="w-5 h-5 text-gray-400 cursor-help" />
      <div className="absolute right-0 w-64 p-3 bg-gray-800 text-white text-sm rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10">
        <p>Click on a day to score it based on your experience:</p>
        <ul className="mt-2 space-y-1">
          <li>• Excellent: Exceeded expectations</li>
          <li>• Good: Accomplished goals</li>
          <li>• Average: Met basic expectations</li>
          <li>• Challenging: Faced obstacles</li>
        </ul>
      </div>
    </div>
  );
};

export default InfoTooltip;