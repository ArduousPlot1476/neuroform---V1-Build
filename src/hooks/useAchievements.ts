import { useState, useEffect } from 'react';
import { achievementsService } from '../services/achievements';
import type { Achievement } from '../components/Summary/Achievements/types';
import type { AchievementProgress } from '../services/achievements/types';

export const useAchievements = () => {
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [progress, setProgress] = useState<AchievementProgress>(
    achievementsService.getProgress()
  );

  useEffect(() => {
    // Update achievements when they change
    const updateAchievements = () => {
      setAchievements(achievementsService.getAchievements());
      setProgress(achievementsService.getProgress());
    };

    // Initial load
    updateAchievements();

    // Set up interval to check for updates
    const interval = setInterval(updateAchievements, 1000);

    return () => clearInterval(interval);
  }, []);

  return {
    achievements,
    progress
  };
};