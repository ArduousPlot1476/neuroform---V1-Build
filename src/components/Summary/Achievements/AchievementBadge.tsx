import React from 'react';
import { getAchievementIcon, getAchievementColor } from './utils';
import type { Achievement } from './types';

interface AchievementBadgeProps {
  achievement: Achievement;
}

const AchievementBadge: React.FC<AchievementBadgeProps> = ({ achievement }) => {
  const Icon = getAchievementIcon(achievement.type);
  const colorClass = getAchievementColor(achievement.type);

  return (
    <div className={`flex items-center p-3 rounded-lg ${colorClass} group transition-all hover:scale-102`}>
      <div className="flex-shrink-0 mr-3">
        <Icon className="w-4 h-4" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between">
          <p className="font-medium text-sm leading-snug truncate">
            {achievement.text}
          </p>
          {achievement.metric && (
            <span className="text-xs opacity-75 ml-2 whitespace-nowrap">
              {achievement.metric}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

export default AchievementBadge;