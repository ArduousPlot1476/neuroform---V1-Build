import React from 'react';
import AchievementsList from './AchievementsList';
import type { Achievement } from './types';

interface AchievementsProps {
  achievements: Achievement[];
}

const Achievements: React.FC<AchievementsProps> = ({ achievements }) => {
  return (
    <section className="bg-white rounded-lg p-6 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold">Key Achievements</h2>
        <span className="text-sm text-gray-500">
          {achievements.length} achievements this week
        </span>
      </div>
      <AchievementsList achievements={achievements} />
    </section>
  );
};

export default Achievements;