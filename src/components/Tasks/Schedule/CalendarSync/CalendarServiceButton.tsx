import React from 'react';
import type { CalendarService } from './types';
import { getServiceIcon, getServiceName } from './utils';

interface CalendarServiceButtonProps {
  service: CalendarService;
  isSelected: boolean;
  onClick: () => void;
}

const CalendarServiceButton: React.FC<CalendarServiceButtonProps> = ({
  service,
  isSelected,
  onClick,
}) => {
  const Icon = getServiceIcon(service);
  const name = getServiceName(service);

  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center space-x-3 p-4 rounded-lg border-2 transition-colors ${
        isSelected
          ? 'border-purple-600 bg-purple-50'
          : 'border-gray-200 hover:border-purple-600 hover:bg-purple-50'
      }`}
    >
      <Icon className={`w-6 h-6 ${isSelected ? 'text-purple-600' : 'text-gray-600'}`} />
      <span className={`font-medium ${isSelected ? 'text-purple-600' : 'text-gray-700'}`}>
        {name}
      </span>
    </button>
  );
};

export default CalendarServiceButton;