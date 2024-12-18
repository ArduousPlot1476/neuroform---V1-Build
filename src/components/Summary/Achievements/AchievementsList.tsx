import React from 'react';
import AchievementBadge from './AchievementBadge';
import { categorizeAchievements } from './utils';
import type { Achievement } from './types';

interface AchievementsListProps {
  achievements: Achievement[];
}

const AchievementsList: React.FC<AchievementsListProps> = ({ achievements }) => {
  const categorized = categorizeAchievements(achievements);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-8">
      {Object.entries(categorized).map(([category, items]) => (
        <div key={category} className="space-y-3">
          <h4 className="text-sm font-medium text-gray-500 uppercase tracking-wide flex items-center">
            <span className="mr-2">{category}</span>
            <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">
              {items.length}
            </span>
          </h4>
          <div className="space-y-2">
            {items.map((achievement) => (
              <AchievementBadge
                key={achievement.id}
                achievement={achievement}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default AchievementsList;