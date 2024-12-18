import React from 'react';
import { getIconComponent } from '../utils';

interface DisplayContentProps {
  time: string;
  activity: string;
  icon?: string;
}

const DisplayContent: React.FC<DisplayContentProps> = ({ time, activity, icon }) => {
  const Icon = icon ? getIconComponent(icon) : null;

  return (
    <>
      <div className="w-16 text-sm text-gray-600">{time}</div>
      <div className="flex items-center gap-2">
        {Icon && <Icon className="w-4 h-4" />}
        <span>{activity}</span>
      </div>
    </>
  );
};

export default DisplayContent;