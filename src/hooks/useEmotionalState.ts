import { useState, useEffect } from 'react';
import { emotionalTracker } from '../services/tracking/emotionalTracker';

export const useEmotionalState = () => {
  const [moodData, setMoodData] = useState(() => {
    const today = new Date();
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const todayMood = emotionalTracker.getWeeklyData().find(data => 
      data.day === days[today.getDay()]
    );
    return {
      value: todayMood?.value || 0,
      label: todayMood?.label || 'No entry',
      progress: todayMood ? (todayMood.value / 10) * 100 : 0
    };
  });

  useEffect(() => {
    const updateMoodData = () => {
      const today = new Date();
      const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
      const todayMood = emotionalTracker.getWeeklyData().find(data => 
        data.day === days[today.getDay()]
      );

      setMoodData({
        value: todayMood?.value || 0,
        label: todayMood?.label || 'No entry',
        progress: todayMood ? (todayMood.value / 10) * 100 : 0
      });
    };

    // Update immediately
    updateMoodData();

    // Update every minute
    const interval = setInterval(updateMoodData, 60000);
    return () => clearInterval(interval);
  }, []);

  return moodData;
};