import React from 'react';
import { TrendingUp, Brain, Target } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string;
  subtitle: string;
  type: 'focus' | 'journal' | 'tasks';
}

const StatCard: React.FC<StatCardProps> = ({ title, value, subtitle, type }) => {
  const getIcon = () => {
    switch (type) {
      case 'focus':
        return <TrendingUp className="w-6 h-6 text-purple-600" />;
      case 'journal':
        return <Brain className="w-6 h-6 text-purple-600" />;
      case 'tasks':
        return <Target className="w-6 h-6 text-purple-600" />;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center space-x-3">
        {getIcon()}
        <h2 className="text-lg font-semibold">{title}</h2>
      </div>
      <p className="text-3xl font-bold mt-2">{value}</p>
      <p className="text-sm text-gray-600 mt-1">{subtitle}</p>
    </div>
  );
};

export default StatCard;